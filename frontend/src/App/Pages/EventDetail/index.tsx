import React, { FC, useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { db } from "../../../firebase.config";

import Border from "../../Components/Border";
import UserContext from "../../Contexts/UserContext";
import {
  dummyEvent,
  dummyUserInfos,
  Event,
  UserInfo,
  UserInfos,
} from "../../interfaces";
import ExpensesList from "./ExpensesList";
import ExpenseList from "./ExpensesList";
import JoinEvent from "./JoinEvent";
import MembersList from "./MembersList";

interface Props {}

const EventDetail: FC<Props> = () => {
  const user = useContext(UserContext);
  const [currentEvent, setCurrentEvent] = useState<Event>(dummyEvent);
  const [members, setMembers] = useState<UserInfos>(dummyUserInfos);
  const [isValidCode, setIsValidCode] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const eventCode = query.get("code");

  // fetch event data from eventCode
  useEffect(() => {
    if (eventCode) {
      (async () => {
        const currentEventSnapshot = await db
          .collection("events")
          .where("code", "==", eventCode)
          .get();
        if (currentEventSnapshot.empty) setIsValidCode(false);
        currentEventSnapshot.forEach((e) => {
          setCurrentEvent({ ...(e.data() as Event) } as Event);
        });
      })();
    } else setIsValidCode(false);
  }, [eventCode]);

  // fetch users data from event data
  useEffect(() => {
    if (currentEvent) {
      (async () => {
        const tempMembers: UserInfos = [];
        for (let i = 0; i < currentEvent.members.length; i++) {
          const userRef = db.collection("users").doc(currentEvent.members[i]);
          const userSnap = await userRef.get();
          if (userSnap.exists) {
            tempMembers.push(userSnap.data() as UserInfo);
          } else {
            console.log(`unknown user with uid ${userRef.id}`);
          }
        }
        setMembers(tempMembers);
      })();
    }
  }, [currentEvent]);

  return (
    <>
      {!user && <Redirect to="/login" />}
      {!isValidCode && <Redirect to="/notfound" />}
      {!isMember && <JoinEvent />}
      <Border>
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 flex flex-row justify-between">
          <h3 className="text-lg w-full leading-6 font-medium text-gray-900">
            {currentEvent?.name}
          </h3>
          <span className="w-20">event info</span>
        </div>
        <MembersList members={members} creator={currentEvent?.creator} />
        <ExpensesList members={members} expenses={currentEvent?.expenses} />
      </Border>
    </>
  );
};

export default EventDetail;
