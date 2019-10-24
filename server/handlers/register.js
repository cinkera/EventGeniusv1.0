const { admin, db, config } = require("../utilities/admin");
const { reduceUserDetails } = require("../utilities/validators");
const firebase = require("firebase");


exports.register = (req, res) => {
    console.log("req.body: ", JSON.stringify(req.body, null));
    let token, userId;
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        handle: req.body.username,
        birthday: req.body.birthday
    };
    console.log("newUser: ", newUser);
    res.send({
        message: `Hello ${req.body.email}!, you are registered!`
    })
}