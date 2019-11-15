const { admin, db, config } = require("../utilities/admin");
const { reduceUserDetails } = require("../utilities/validators");
const firebase = require("firebase");
firebase.initializeApp(config);

exports.register = (req, res) => {
  console.log("\n ... register function users.js, req.body: ", JSON.stringify(req.body, null));
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    handle: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthday: req.body.birthday
  };
  let response = [];
  console.log("\n ... newUser: ", newUser);
  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        console.log("this Name Exists, error");
        return res
          .status(400)
          .json({ error: "This username is already taken." });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        birthday: newUser.birthday,
        createdAt: new Date().toISOString(),
        imageUrl: "",//`https://firebasestorage.googleapis.com/v0/b/axon-social-network.appspot.com/o/no-img.png?alt=media&token=1f280c14-af12-4884-9b53-cb9d31540c00`,
        userId,
        bio: "This is your bio and can be changed by editing your profile.",

        // TODO:
        // * Create subCollection of followers and following
        // * Update the count on change
        followersCount: 0,
        followingCount: 0
      };
      db.collection(`/users/${newUser.handle}/followers`).add({
        handle: "",
        imageUrl: ""
      });
      db.collection(`/users/${newUser.handle}/following`).add({
        handle: "",
        imageUrl: ""
      });
      response.push({ "user": userCredentials });
      console.log("\n ...response: ", response);
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      response.push({ "token": token });
      console.log("\n ...response: ", response);
      return res.status(201).json(response);
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ error: "Email is already in use." });
      } else {
        return res
          .status(500)
          .json({ error: "Something went wrong, please try again." });
      }
    });
};

// Login user
exports.login = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    let response = [];
    let getUserResponse = await db.collection("users").where("email", "==", user.email).get();
    for(const user of getUserResponse.docs) {
      // console.log("\n ... user:", user.data());
      response.push({"user": user.data()});
    }
    firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      response.push({"token": token});
      return res.status(200).json(response);;
    })
    .catch(err => {
      console.error(err);
      return res
        .status(403)
        .json({ error: "Wrong credentials, please try again." });
    });
    
  } catch(error) {
    console.log("\n ... error: ", error);
    return res.status(500).json({error: error.code});
  }
};
// Logout user
exports.logout = async (req, res) => {
  console.log("\n ... logout function in user.js");
  try {
    const response = await firebase.auth().signOut();
    console.log("\n ... response from logout: ", response);
    console.log("\n ... signed out user!");
    return response;
    
  } catch (e){
    console.log("\n ... error logging out", err);
    res.status(500).json({ error: err.code });
  } 
};
// Add user details

// Get authenticated user details
exports.getAuthUser = async (req, res) => {
  console.log("\n ... users.js/getAuthUser -- req.user: ", req.user );
  let userData = {};

  try {
    const user = await db.doc(`/users/${req.user.handle}`).get();
    if (user.exists) {
      userData.user = user.data();

      userData.likes = {};
      userData.followers = {};
      userData.following = {};

      const likes = await db
        .collection("likes")
        .where("userHandle", "==", req.user.handle)
        .get();
      likes.docs.forEach(doc => {
        userData.likes[doc.data().postId] = {
          userHandle: doc.data().userHandle,
          postId: doc.data().postId
        };
      });

      const following = await db
        .collection(`/users/${req.user.handle}/following`)
        .get();

      following.docs.forEach(doc => {
        userData.following[doc.id] = {
          handle: doc.data().handle,
          imageUrl: doc.data().imageUrl
        };
      });

      const followers = await db
        .collection(`/users/${req.user.handle}/followers`)
        .get();

      followers.docs.forEach(doc => {
        userData.followers[doc.id] = {
          handle: doc.data().handle,
          imageUrl: doc.data().imageUrl
        };
      });
      console.log("\n ... userData: ", userData);
      return res.json(userData);
    } else {
      return res.status(404).json({ error: "User not found :(" });
    }

    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.code });
  }
};

// Get user details
exports.getUserData = (req, res) => {
  let userData = {};

  db.doc(`/users/${req.params.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData = doc.data();
        return res.json(userData);
      } else {
        return res.status(404).json({ error: "User not found :(" });
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.uid}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.checkExists = (req, res) => {
  db.doc(`/users/${req.params.handle}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).send(false);
      }
      return res.send(true);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

// Upload profile image for user
exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  const TYPE = req.body.type;

  let imageToBeUploaded = {};
  let imageFileName;

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(fieldname, file, filename, encoding, mimetype);

    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res
        .status(400)
        .json({ error: "Wrong file type submitted, jpg or png." });
    }

    const IMAGEEXT = filename.split(".")[filename.split(".").length - 1];

    imageFileName = `${Math.round(Math.random() * 1000000000).toString()}-${
      firebase.auth().currentUser.uid
    }.${IMAGEEXT}`;
    const FILEPATH = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { FILEPATH, mimetype };
    file.pipe(fs.createWriteStream(FILEPATH));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.FILEPATH, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(() => {
        const IMAGEURL = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        if (TYPE === "user") {
          return db.doc(`/users/${req.user.uid}`).update({ IMAGEURL });
        } else {
          return db.doc(`/posts/${req.post.uid}`).update({ IMAGEURL });
        }
      })
      .then(() => {
        return res.json({ message: "Image uploaded successfully!" });
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong :(" });
      });
    busboy.end(req.rawBody);
  });
};
