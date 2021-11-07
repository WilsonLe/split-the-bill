import React, { FC, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../firebase.config";
import {
  Event,
  EventWithoutMemberExpense,
  UserInfo,
} from "../../../interfaces";
import UserContext from "../../../Contexts/UserContext";
import { doc, setDoc, Timestamp } from "firebase/firestore";
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEventLink: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentEvent: React.Dispatch<React.SetStateAction<Event>>;
}

const NewJobPrompt: FC<Props> = ({
  setOpen,
  setShowEventLink,
  setCurrentEvent,
}) => {
  const [eventName, setEventName] = useState("");
  const [error, setError] = useState("");
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const user = useContext(UserContext);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableButton(true);
    if (error !== "") return;
    if (eventName === "") {
      setError("Event name cannot be empty");
      return;
    }

    if (user) {
      const eventCode = uuidv4();
      const newEvent = {
        name: eventName,
        code: eventCode,
        createdAt: Timestamp.now(),
        creator: {
          uid: user.uid,
          photoURL: user.photoURL as string,
          displayName: user.displayName as string,
        },
      } as EventWithoutMemberExpense;
      try {
        await setDoc(doc(db, "events", eventCode), newEvent);
        await setDoc(doc(db, "events", eventCode, "members", user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        } as UserInfo);
        await setDoc(doc(db, "users", user.uid, "events", eventCode), {
          code: eventCode,
        });
        setCurrentEvent({
          ...newEvent,
          id: eventCode,
        } as Event);
        setShowEventLink(true);
      } catch (error) {
        setDisableButton(false);
        console.log(error);
      }
    }
    setOpen(false);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setError("Event name cannot be empty");
    else setError("");
    setEventName(e.target.value);
  };

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Create Event
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Enter your event name to create a new event</p>
        </div>
        <form onSubmit={submitHandler} className="mt-5 sm:flex sm:items-center">
          <div className="flex flex-col relative">
            <div className="w-full h-8 sm:max-w-xs">
              <label htmlFor="event_name" className="sr-only">
                Event name
              </label>
              <input
                type="text"
                name="event_name"
                value={eventName}
                onChange={onChangeHandler}
                autoComplete="off"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full p-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Event name"
              />
            </div>
            {error !== "" && (
              <span className="mt-2 mx-2 text-red-500 text-xs">{error}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={disableButton}
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};
export default NewJobPrompt;
