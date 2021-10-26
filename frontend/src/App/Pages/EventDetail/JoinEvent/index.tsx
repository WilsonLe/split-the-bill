import { Dialog } from "@headlessui/react";
import React, { FC, useContext, useState } from "react";
import { db } from "../../../../firebase.config";
import { ButtonPrimary } from "../../../Components/Button";
import { BasePopup } from "../../../Components/Popup";
import UserContext from "../../../Contexts/UserContext";
import { Event, UserInfo, UserInfos } from "../../../interfaces";

interface Props {
  currentEvent: Event;
}

const JoinEvent: FC<Props> = ({ currentEvent }) => {
  const user = useContext(UserContext);
  const [showJoinEvent, setShowJoinEvent] = useState(true);

  const joinEventHandler = async (currentEvent: Event) => {
    if (user && currentEvent) {
      const updatedMembersUid = [...currentEvent.membersUid, user.uid];
      const updatedMembers = [
        ...currentEvent.members,
        {
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
        } as UserInfo,
      ] as UserInfos;
      try {
        await db
          .collection("events")
          .doc(currentEvent.code)
          .update({
            membersUid: updatedMembersUid,
            members: updatedMembers,
          } as Event);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <BasePopup open={showJoinEvent} setOpen={setShowJoinEvent}>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            Join Event
          </Dialog.Title>
          <div className="mt-2">
            <div className="my-4">
              <p className="text-sm text-gray-500">
                It looks like you are not a member of this event.
              </p>
            </div>
            <div>
              <ButtonPrimary
                onClick={() => {
                  setShowJoinEvent(false);
                  joinEventHandler(currentEvent);
                }}
              >
                Join Now
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </BasePopup>
    </>
  );
};

export default JoinEvent;
