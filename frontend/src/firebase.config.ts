import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

// const productionConfig = {
//   apiKey: "AIzaSyBkdu7hJMC2YoFWdEQzt9kcAf__iloYKqU",
//   authDomain: "split-the-bill-production.firebaseapp.com",
//   projectId: "split-the-bill-production",
//   storageBucket: "split-the-bill-production.appspot.com",
//   messagingSenderId: "705905223142",
//   appId: "1:705905223142:web:73cc4b89d09e2d707aa227",
//   measurementId: "G-QZWPK08CE6",
// };

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

console.log({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

// firebase.functions().useEmulator("localhost", 5001);

const db = firebase.firestore();
const auth = firebase.auth();

export { firebase, auth, db };
