import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const app = initializeApp({
  apiKey: "AIzaSyC6kDthry3jyCTVT5fTAmmoNWNiY5P6-wM",
  authDomain: "split-the-bill-wilsonle.firebaseapp.com",
  projectId: "split-the-bill-wilsonle",
  storageBucket: "split-the-bill-wilsonle.appspot.com",
  messagingSenderId: "1013787776558",
  appId: "1:1013787776558:web:ae5e16e6b10a560c50f1bf",
  measurementId: "G-SB5YFTFKJX",
});

const db = getFirestore(app);
const auth = getAuth(app);
const fn = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(fn, "localhost", 5001);
}

export { db, auth, fn };
