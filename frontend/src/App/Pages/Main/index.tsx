import React, { FC, useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { db, firebase } from "../../../firebase.config";

import UserContext from "../../Contexts/UserContext";
import EventList from "./EventList";

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
      {!user && <Redirect to="/login" />}
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Events</h3>
      </div>

      <EventList />

      {/* {creatorEvents.map((event: firebase.firestore.DocumentData) => (
        <div key={event.code}>{event.name}</div>
      ))} */}
    </>
  );
};

export default Main;
