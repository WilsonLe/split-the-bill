import { UserInfo } from "os";
import React, { FC, useContext, useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { db } from "../../../firebase.config";
import Border from "../../Components/Border";
import UserContext from "../../Contexts/UserContext";
import { dummyEvent, dummyUserInfos, Event, UserInfos } from "../../interfaces";
import JoinEvent from "./JoinEvent";

interface Props {}

const EventDetail: FC<Props> = () => {
  const user = useContext(UserContext);
  const [currentEvent, setCurrentEvent] = useState<Event>(dummyEvent);
  const [members, setMember] = useState<UserInfos>(dummyUserInfos);
  const [isValidCode, setIsValidCode] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const eventCode = query.get("code");

  useEffect(() => {
    // check if event code exist(), if it does, setState(currentEvent)
    (async () => {
      const currentEventSnapshot = await db
        .collection("events")
        .where("code", "==", eventCode)
        .get();
      if (currentEventSnapshot.empty) setIsValidCode(false);
      currentEventSnapshot.forEach((e) => {
        setCurrentEvent({ id: e.id, ...(e.data() as Event) } as Event);
      });
    })();
  }, [eventCode]);

  useEffect(() => {
    const detailMembers = currentEvent.members.map(async (memberUID) => {
      db.collection("events");
    });
    console.log(currentEvent?.id);
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
      </Border>
    </>
  );
};

export default EventDetail;
