import React, { FC, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { firebase } from "../../../firebase.config";
interface Props {}

const Login: FC<Props> = () => {
  const user = useContext(UserContext);

  const sign_in = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <>
      <h1>Login Page</h1>
      {user ? <Redirect to="/" /> : <button onClick={sign_in}>Sign In</button>}
    </>
  );
};

export default Login;
