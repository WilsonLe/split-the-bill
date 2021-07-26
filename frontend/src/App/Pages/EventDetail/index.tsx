import React, { FC, useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { db } from "../../../firebase.config";
import UserContext from "../../Contexts/UserContext";
import { dummyEvent, Event } from "../../interfaces";
interface Props {}

const EventDetail: FC<Props> = () => {
  const user = useContext(UserContext);
  const [currentEvent, setCurrentEvent] = useState(dummyEvent);
  const [isValidCode, setIsValidCode] = useState(true);
  const query = new URLSearchParams(useLocation().search);
  const eventCode = query.get("code");
  // check if event code exist()
  useEffect(() => {
    (async () => {
      const currentEventSnapshot = await db
        .collection("events")
        .where("code", "==", eventCode)
        .get();
      if (currentEventSnapshot.empty) setIsValidCode(false);
      currentEventSnapshot.forEach((e) => {
        setCurrentEvent(e.data() as Event);
      });
    })();
  }, [eventCode]);

  return (
    <>
      {!user && <Redirect to="/login" />}
      {!isValidCode && <Redirect to="/notfound" />}
      <h1>Event Page</h1>
      <p>{currentEvent?.code}</p>
      <p>{currentEvent?.name}</p>
    </>
  );
};

export default EventDetail;
