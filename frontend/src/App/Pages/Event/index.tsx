import React, { FC } from "react";
import { useLocation } from "react-router-dom";
interface props {}

const Event: FC<props> = (props) => {
  const query = new URLSearchParams(useLocation().search);
  const eventCode = query.get("code");
  console.log(eventCode);

  // check if event code exist()
  return (
    <>
      <h1>Event Page</h1>
      <p>{query.get("hi")}</p>
    </>
  );
};

export default Event;
