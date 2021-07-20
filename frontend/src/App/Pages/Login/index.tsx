import React, { FC, useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { firebase } from "../../../firebase.config";
interface props {}

const Login: FC<props> = (props) => {
  const user = useContext(UserContext);

  const sign_in = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  const sign_out = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <h1>Login Page</h1>
      {user ? (
        <button onClick={sign_out}>Sign Out</button>
      ) : (
        <button onClick={sign_in}>Sign In</button>
      )}
    </>
  );
};

export default Login;
