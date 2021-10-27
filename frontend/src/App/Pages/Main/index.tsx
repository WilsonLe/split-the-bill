import React, { FC, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { db } from "../../../firebase.config";
import Border from "../../Components/Border";

import UserContext from "../../Contexts/UserContext";
import EventList from "./EventList";

import { Event } from "../../interfaces";
import { collection, onSnapshot, query, where } from "firebase/firestore";

interface Props {}

const Main: FC<Props> = () => {
  const user = useContext(UserContext);
  const [eventList, setEventList] = useState<Event[]>([]);

  // fetch all event that has current user a member
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "events"),
        where("membersUid", "array-contains", user.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const creatorEvents: Event[] = [];
        querySnapshot.forEach(
          (doc) => {
            creatorEvents.push(doc.data() as Event);
          },
          (error: any) => {
            console.log(error);
          }
        );
        setEventList(creatorEvents);
      });
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
