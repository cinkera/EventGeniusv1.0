const { admin, db } = require("./admin");

module.exports = (req, res, next) => {
  let idToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found :(");
    return res.status(403).json({ error: "Unauthorized" });
  }

  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      return db
        .collection("users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
      req.user.name = data.docs[0].data().name;
      req.user.uid = data.docs[0].data().userId;
      req.user.admin = data.docs[0].data().admin;
      req.user.imageUrl = data.docs[0].data().imageUrl;
      req.user.handle = data.docs[0].data().handle;
      req.user.followersCount = data.docs[0].data().followersCount;
      req.user.followingCount = data.docs[0].data().followingCount;
      return next();
    })
    .catch(err => {
      console.error("Error while verifying token ", err);
      return res.status(403).json(err);
    });
};
