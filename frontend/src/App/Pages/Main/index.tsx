import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

interface Props {}

const Main: FC<Props> = () => {
  const user = useContext(UserContext);
  return (
    <>
      <h1>Main Page</h1>
      {user && <p>{user.uid}</p>}
      <Link to="/event">To event</Link>
    </>
  );
};

export default Main;
