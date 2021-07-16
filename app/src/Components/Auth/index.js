import React from "react";

import { firebase } from "../../firebase.config";

const Auth = ({ user }) => {
  const sign_in = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };
  const sign_out = () => {
    firebase.auth().signOut();
  };
  return (
    <div>
      <h1>Please authenticate to continue</h1>
      {user ? (
        <button onClick={sign_out}>Sign Out</button>
      ) : (
        <button onClick={sign_in}>Sign In</button>
      )}
    </div>
  );
};

export default Auth;
