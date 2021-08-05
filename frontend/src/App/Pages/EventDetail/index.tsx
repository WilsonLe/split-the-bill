import React, { FC, useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { db } from "../../../firebase.config";

import Border from "../../Components/Border";
import { ButtonLight, ButtonRed } from "../../Components/Button";
import ConfirmDelete from "../../Components/Popup/ConfirmDelete";
import EventCode from "../../Components/Popup/EventCode";
import UserContext from "../../Contexts/UserContext";
import {
  dummyEvent,
  dummyUserInfos,
  Event,
  UserInfo,
  UserInfos,
} from "../../interfaces";
import AddExpense from "./AddExpense";
import ExpensesList from "./ExpensesList";
import ExpenseList from "./ExpensesList";
import JoinEvent from "./JoinEvent";
import MembersList from "./MembersList";
import SplitTheBill from "./SplitTheBill";

interface Props {}

const EventDetail: FC<Props> = () => {
  const user = useContext(UserContext);
  const [currentEvent, setCurrentEvent] = useState<Event>(dummyEvent);
  const [members, setMembers] = useState<UserInfos>(dummyUserInfos);
  const [isValidCode, setIsValidCode] = useState(true);
  const [isMember, setIsMember] = useState(true);
  const [isCreator, setIsCreator] = useState(false);
  const [checkMember, setCheckMember] = useState(false);
  const [showEventLink, setShowEventLink] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [eventDeleted, setEventDeleted] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const eventCode = query.get("code");

  // fetch event data from eventCode
  useEffect(() => {
    if (eventCode) {
      const unsubscribe = db
        .collection("events")
        .where("code", "==", eventCode)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setCurrentEvent(doc.data() as Event);
          });
        });
      return () => unsubscribe();
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

  // check if user is in member list
  useEffect(() => {
    if (user && currentEvent) {
      if (!currentEvent.members.includes(user.uid)) {
        setIsMember(false);
      } else {
        setIsMember(true);
      }
      setCheckMember(true);
    }
  }, [currentEvent?.members]);

  // check if user is creator
  useEffect(() => {
    // if (user){if (user.uid === db.collection('events'))}
  }, []);
  const deleteEventHandler = async (currentEvent: Event) => {
    const eventSnap = await db
      .collection("events")
      .where("code", "==", currentEvent.code)
      .get();
    eventSnap.forEach((e) => e.ref.delete());
    await new Promise((res, rej) => setTimeout(res, 500));
    setEventDeleted(true);
  };
  if (checkMember) {
    return (
      <>
        {!user && <Redirect to="/login" />}
        {!isValidCode && <Redirect to="/notfound" />}
        {!isMember && <JoinEvent currentEvent={currentEvent} />}
        {eventDeleted && <Redirect to="/" />}
        <Border>
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 flex flex-row justify-between">
            <h3 className="text-lg w-full leading-6 font-medium text-gray-900">
              {currentEvent?.name}
            </h3>
            <ButtonLight onClick={() => setShowEventLink(true)}>
              Link
            </ButtonLight>
            <EventCode
              showEventLink={showEventLink}
              setShowEventLink={setShowEventLink}
              currentEvent={currentEvent}
              title={"Event Link"}
            />
            <ButtonRed onClick={() => setShowConfirmDelete(true)}>
              Delete
            </ButtonRed>
            <ConfirmDelete
              showConfirmDelete={showConfirmDelete}
              setShowConfirmDelete={setShowConfirmDelete}
              currentEvent={currentEvent}
              deleteEventHandler={deleteEventHandler}
            />
          </div>
          <MembersList members={members} creator={currentEvent?.creator} />
          <ExpensesList
            currentEvent={currentEvent}
            members={members}
            expenses={currentEvent?.expenses}
          />
          <SplitTheBill />
          <AddExpense
            currentEvent={currentEvent}
            setCurrentEvent={setCurrentEvent}
          />
        </Border>
      </>
    );
  } else return null;
};

export default EventDetail;
