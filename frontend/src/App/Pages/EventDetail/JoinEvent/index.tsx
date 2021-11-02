import React, { FC, useContext, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Dialog } from "@headlessui/react";
import { db } from "../../../../firebase.config";
import { ButtonPrimary } from "../../../Components/Button";
import { BasePopup } from "../../../Components/Popup";
import UserContext from "../../../Contexts/UserContext";
import { Event, UserInfo } from "../../../interfaces";

interface Props {
  currentEvent: Event;
  setJustJoin: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinEvent: FC<Props> = ({ currentEvent, setJustJoin }) => {
  const user = useContext(UserContext);
  const [showJoinEvent, setShowJoinEvent] = useState(true);

  const joinEventHandler = async (currentEvent: Event) => {
    if (user && currentEvent) {
      try {
        // check if user in user collection
        // if user in collection, do nothing
        // else, create one
        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (!userSnap.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          } as UserInfo);
        }

        // update user's joined events
        await setDoc(doc(db, "users", user.uid, "events", currentEvent.code), {
          code: currentEvent.code,
        });

        // update joined events members
        await setDoc(
          doc(db, "events", currentEvent.code, "members", user.uid),
          {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          } as UserInfo
        );

        setJustJoin(true);
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
