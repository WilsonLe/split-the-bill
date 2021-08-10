import { Dialog } from "@headlessui/react";
import React, { FC, useContext, useState } from "react";
import { db } from "../../../../firebase.config";
import { ButtonPrimary } from "../../../Components/Button";
import { BasePopup } from "../../../Components/Popup";
import UserContext from "../../../Contexts/UserContext";
import { Event } from "../../../interfaces";

interface Props {
  currentEvent: Event;
}

const JoinEvent: FC<Props> = ({ currentEvent }) => {
  const user = useContext(UserContext);
  const [showJoinEvent, setShowJoinEvent] = useState(true);

  const joinEventHandler = async (currentEvent: Event) => {
    try {
      if (user && currentEvent) {
        const updatedMembers = [...currentEvent.members, user.uid];
        const eventSnap = await db
          .collection("events")
          .where("code", "==", currentEvent.code)
          .get();
        eventSnap.forEach(
          async (e) =>
            await e.ref.update({
              ...currentEvent,
              members: updatedMembers,
            } as Event)
        );
      }
    } catch (error) {
      console.log("error 8");
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
