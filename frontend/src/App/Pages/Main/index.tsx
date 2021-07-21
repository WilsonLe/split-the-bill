import React, { FC, useContext } from "react";
import UserContext from "../../Contexts/UserContext";

interface Props {}

const Main: FC<Props> = (props) => {
  const user = useContext(UserContext);
  return (
    <>
      <h1>Main Page</h1>
      {user && <p>{user.uid}</p>}
    </>
  );
};

export default Main;
