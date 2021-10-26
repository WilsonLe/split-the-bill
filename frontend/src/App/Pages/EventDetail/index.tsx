import React, { FC, useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { db } from "../../../firebase.config";

import Border from "../../Components/Border";
import { ButtonLight, ButtonRed } from "../../Components/Button";
import ConfirmDelete from "../../Components/Popup/ConfirmDelete";
import ConfirmLeave from "../../Components/Popup/ConfirmLeave";
import EventCode from "../../Components/Popup/EventCode";
import UserContext from "../../Contexts/UserContext";
import { dummyEvent, dummyUserInfos, Event, UserInfos } from "../../interfaces";
import AddExpense from "./AddExpense";
import ExpensesList from "./ExpensesList";
import JoinEvent from "./JoinEvent";
import MembersList from "./MembersList";
import SplitTheBill from "./SplitTheBill";

interface Props {}

const EventDetail: FC<Props> = () => {
  const user = useContext(UserContext);
  const [auth, setAuth] = useState(true);
  const [currentEvent, setCurrentEvent] = useState<Event>(dummyEvent);
  const [members, setMembers] = useState<UserInfos>(dummyUserInfos);
  const [isValidCode, setIsValidCode] = useState(true);
  const [isCreator, setIsCreator] = useState(false);
  const [isMember, setIsMember] = useState(true);
  const [justLeft, setJustLeft] = useState(false);
  const [showEventLink, setShowEventLink] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);
  const [eventDeleted, setEventDeleted] = useState(false);
  const [eventLeft, setEventLeft] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const eventCode = query.get("code");

  // fetch event data from eventCode
  useEffect(() => {
    if (eventCode) {
      const unsubscribe = db
        .collection("events")
        .doc(eventCode)
        .onSnapshot(
          (doc) => {
            if (doc.exists) {
              const event = doc.data() as Event;
              console.log(event);
              setCurrentEvent(event);
              setMembers(event.members);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      return () => unsubscribe();
    } else setIsValidCode(false);
  }, [eventCode]);

  // check if user is creator
  useEffect(() => {
    if (user && currentEvent) {
      if (user.uid === currentEvent.creator.uid) setIsCreator(true);
      else setIsCreator(false);
    }
  }, [user, currentEvent]);

  // check if user is member
  useEffect(() => {
    if (user && currentEvent) {
      if (currentEvent.membersUid.includes(user.uid)) setIsMember(true);
      else setIsMember(false);
    }
  }, [user, currentEvent]);

  // check auth after 1 sec
  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      if (!user) setAuth(false);
      else setAuth(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [user]);

  const deleteEventHandler = async (currentEvent: Event) => {
    if (currentEvent) {
      try {
        await db.collection("events").doc(currentEvent.code).delete();
        setEventDeleted(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const leaveEventHandler = async (currentEvent: Event) => {
    if (user && currentEvent) {
      const updatedMembers = currentEvent.members.filter(
        (member) => member.uid !== user.uid
      );
      const updatedMembersUid = currentEvent.membersUid.filter(
        (uid) => uid !== user.uid
      );
      setJustLeft(true);
      try {
        await db
          .collection("events")
          .doc(currentEvent.code)
          .update({
            ...currentEvent,
            members: updatedMembers,
            membersUid: updatedMembersUid,
          } as Event);
        setEventLeft(true);
      } catch (error) {
        setJustLeft(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      {!auth && <Redirect to={`/login?code=${eventCode}`} />}
      {!isValidCode && <Redirect to="/notfound" />}
      {!isMember && !justLeft && currentEvent && (
        <JoinEvent currentEvent={currentEvent} />
      )}
      {eventDeleted && <Redirect to="/" />}
      {eventLeft && <Redirect to="/" />}
      {currentEvent && (
        <Border>
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 flex flex-row justify-between items-center">
            <h3 className="text-lg w-full leading-6 font-medium text-gray-900">
              {currentEvent.name}
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
            <span className="mx-2 sm:mx-4"></span>
            {isCreator ? (
              <>
                <ButtonRed onClick={() => setShowConfirmDelete(true)}>
                  Delete
                </ButtonRed>
                <ConfirmDelete
                  showConfirmDelete={showConfirmDelete}
                  setShowConfirmDelete={setShowConfirmDelete}
                  currentEvent={currentEvent}
                  deleteEventHandler={deleteEventHandler}
                />
              </>
            ) : (
              <>
                <ButtonRed onClick={() => setShowConfirmLeave(true)}>
                  Leave
                </ButtonRed>
                <ConfirmLeave
                  showConfirmLeave={showConfirmLeave}
                  setShowConfirmLeave={setShowConfirmDelete}
                  currentEvent={currentEvent}
                  leaveEventHandler={leaveEventHandler}
                />
              </>
            )}
          </div>
          <MembersList members={members} creator={currentEvent?.creator} />
          <ExpensesList
            currentEvent={currentEvent}
            members={members}
            expenses={currentEvent?.expenses}
          />

          <div className="relative mt-2 mb-10 h-16">
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 translate-y-1/2">
              <SplitTheBill currentEvent={currentEvent} members={members} />
            </div>
            <div className="absolute right-0 top-0transform translate-y-1/4">
              <AddExpense
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
              />
            </div>
          </div>
        </Border>
      )}
    </>
  );
};

export default EventDetail;
