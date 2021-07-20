import React, { FC, useContext } from "react";
import UserContext from "../../Contexts/UserContext";

interface props {}

const Main: FC<props> = (props) => {
  const user = useContext(UserContext);
  return (
    <>
      <h1>Main Page</h1>
      {user && <p>{user.uid}</p>}
    </>
  );
};

export default Main;
