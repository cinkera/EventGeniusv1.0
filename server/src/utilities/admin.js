const admin = require("firebase-admin");

const credential = require("../../serviceAccountKey.json");

const config = {
    apiKey: "AIzaSyBrj2GahLSBZ3AxaJFHfMRW2dsQOeJShdI",
    authDomain: "eventgenius-1cae4.firebaseapp.com",
    databaseURL: "https://eventgenius-1cae4.firebaseio.com",
    projectId: "eventgenius-1cae4",
    storageBucket: "eventgenius-1cae4.appspot.com",
    messagingSenderId: "632073762266",
    appId: "1:632073762266:web:6c246bf3d5c3f573fa3ce3",
    measurementId: "G-CGB4CZFFBJ"
};

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: config.databaseURL
});

const db = admin.firestore();

module.exports = { admin, db, config };

// import firebase from 'firebase'
// import 'firebase/firestore'
// import firebaseConfig from './firebaseConfig'
// const firebaseApp = firebase.initializeApp(firebaseConfig)
// export default firebaseApp.firestore()
