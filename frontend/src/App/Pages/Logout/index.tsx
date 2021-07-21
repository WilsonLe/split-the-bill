import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../../../firebase.config";

interface Props {}

const Logout: FC<Props> = () => {
  auth.signOut();
  return <Redirect to="/login" />;
};

export default Logout;
