import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

firebase.initializeApp({
  apiKey: "AIzaSyC6kDthry3jyCTVT5fTAmmoNWNiY5P6-wM",
  authDomain: "split-the-bill-wilsonle.firebaseapp.com",
  projectId: "split-the-bill-wilsonle",
  storageBucket: "split-the-bill-wilsonle.appspot.com",
  messagingSenderId: "1013787776558",
  appId: "1:1013787776558:web:3df28f655cdc670150f1bf",
  measurementId: "G-ZKVXW3YGHB",
});
firebase.functions().useEmulator("localhost", 5001);

const db = firebase.firestore();
const auth = firebase.auth();

export { firebase, auth, db };
