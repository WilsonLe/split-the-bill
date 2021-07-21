import React, { FC, useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
interface Props {}

const Event: FC<Props> = () => {
  const user = useContext(UserContext);

  const query = new URLSearchParams(useLocation().search);
  const eventCode = query.get("code");

  // check if event code exist()
  if (user)
    return (
      <>
        <h1>Event Page</h1>
        <p>{query.get("hi")}</p>
      </>
    );
  else return <Redirect to="/login" />;
};

export default Event;
