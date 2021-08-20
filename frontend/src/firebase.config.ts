import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const productionConfig = {
  apiKey: "AIzaSyBkdu7hJMC2YoFWdEQzt9kcAf__iloYKqU",
  authDomain: "split-the-bill-production.firebaseapp.com",
  projectId: "split-the-bill-production",
  storageBucket: "split-the-bill-production.appspot.com",
  messagingSenderId: "705905223142",
  appId: "1:705905223142:web:73cc4b89d09e2d707aa227",
  measurementId: "G-QZWPK08CE6",
};

const developmentConfig = {
  apiKey: "AIzaSyC6kDthry3jyCTVT5fTAmmoNWNiY5P6-wM",
  authDomain: "split-the-bill-wilsonle.firebaseapp.com",
  projectId: "split-the-bill-wilsonle",
  storageBucket: "split-the-bill-wilsonle.appspot.com",
  messagingSenderId: "1013787776558",
  appId: "1:1013787776558:web:3df28f655cdc670150f1bf",
  measurementId: "G-ZKVXW3YGHB",
};

if ((process.env.REACT_APP_DEPLOY_ENV = "production")) {
  firebase.initializeApp(productionConfig);
} else {
  firebase.initializeApp(developmentConfig);
}

firebase.functions().useEmulator("localhost", 5001);

const db = firebase.firestore();
const auth = firebase.auth();

export { firebase, auth, db };
