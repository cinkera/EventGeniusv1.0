const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const functions = require("firebase-functions");
const auth = require("./utilities/auth");
const RegisterPolicy = require("./utilities/RegisterPolicy");
const { db } = require("./utilities/admin");

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

// const {
//     login,
//     // register,
//     getAuthUser,
//     getUserData,
//     addUserDetails,
//     uploadImage,
//     checkExists
//   } = require("./handlers/users");

const { register, getAuthUser, login, getUserData } = require("./handlers/users")

/* routes */
app.post('/register', RegisterPolicy.register, register);
app.get('/user/:userHandle', auth, getAuthUser);

app.listen(process.env.PORT || 8081);
console.log("express server running on port 8081");
