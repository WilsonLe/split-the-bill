import React, { FC, useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { db } from "../../../firebase.config";
import Border from "../../Components/Border";

import UserContext from "../../Contexts/UserContext";
import EventList from "./EventList";

import { Event, UserInfo } from "../../interfaces";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { FirebaseError } from "@firebase/util";

interface Props {}

const Main: FC<Props> = () => {
  const user = useContext(UserContext);
  const [eventList, setEventList] = useState<Event[]>([]);
  const [eventCodeList, setEventCodeList] = useState<string[]>([]);

  // check if user in user collection
  // if user in collection, do nothing
  // else, create one
  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const userSnap = await getDoc(doc(db, "users", user.uid));
          if (!userSnap.exists()) {
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            } as UserInfo);
          }
        } catch (error) {
          if (error instanceof FirebaseError) {
            console.log(error.code);
          } else {
            console.log(error);
          }
        }
      }
    })();
  }, [user]);

  // fetch all event codes of current user
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(db, "users", user.uid, "events"),
        (querySnapshot) => {
          const creatorEventCodes: string[] = querySnapshot.docs.map(
            (doc) => doc.id
          );
          setEventCodeList(creatorEventCodes);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  // fetch all event data in event codes
  useEffect(() => {
    (async () => {
      if (user && eventCodeList.length > 0) {
        const eventSnap = await getDocs(
          query(collection(db, "events"), where("code", "in", eventCodeList))
        );
        const eventList: Event[] = eventSnap.docs.map((e) => e.data() as Event);
        setEventList(eventList);
      }
    })();
  }, [user, eventCodeList]);

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
