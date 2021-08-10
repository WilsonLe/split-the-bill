import React, { FC, useContext, useEffect, useState } from "react";
import { firebase } from "../../../firebase.config";
import { Redirect } from "react-router-dom";

import { db } from "../../../firebase.config";
import Border from "../../Components/Border";

import UserContext from "../../Contexts/UserContext";
import EventList from "./EventList";

import { Event } from "../../interfaces";

interface Props {}

const Main: FC<Props> = () => {
  const user = useContext(UserContext);
  const [eventList, setEventList] = useState<Event[]>([]);

  // fetch all event that has current user a member
  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("events")
        .where("members", "array-contains", user.uid)
        .onSnapshot(
          (querySnapshot) => {
            const creatorEvents: Event[] = [];
            querySnapshot.forEach((doc) => {
              creatorEvents.push(doc.data() as Event);
            });
            setEventList(creatorEvents);
          },
          (error) => {
            console.log(error);
          }
        );
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <>
      {!user && <Redirect to="/login" />}
      <Border>
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Events
          </h3>
        </div>

        <EventList eventList={eventList} />
      </Border>
    </>
  );
};

export default Main;
