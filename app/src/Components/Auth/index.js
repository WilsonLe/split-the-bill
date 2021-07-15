import React from "react";

import { firebase } from "../../firebaseConfig";

const Auth = ({ user,setPage }) => {
  const sign_in = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    setPage('actions')
  };
  const sign_out = () => {
    firebase.auth().signOut();
  };
  return (
    <div>
      <h1>Hello from auth</h1>
      {user ? (
        <button onClick={sign_out}>Sign Out</button>
      ) : (
        <button onClick={sign_in}>Sign In</button>
      )}
    </div>
  );
};

export default Auth;
