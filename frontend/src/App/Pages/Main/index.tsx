import React, { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { db, firebase } from "../../../firebase.config";

import UserContext from "../../Contexts/UserContext";

interface Props {}

const Main: FC<Props> = () => {
  const user = useContext(UserContext);
  const [creatorEvents, setCreatorEvents] = useState<
    firebase.firestore.DocumentData[]
  >([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("events")
        .where("creator", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          const creatorEvents: firebase.firestore.DocumentData[] = [];
          querySnapshot.forEach((doc) => {
            creatorEvents.push(doc.data());
          });
          setCreatorEvents(creatorEvents);
        });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <>
      <h1>Main Page</h1>
      {user && <p>{user.uid}</p>}
      <Link to="/event">To event</Link>

      {creatorEvents.map((event: firebase.firestore.DocumentData) => (
        <div key={event.code}>{event.name}</div>
      ))}
    </>
  );
};

export default Main;
