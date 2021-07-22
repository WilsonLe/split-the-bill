import React, { FC, useContext, useState } from "react";
import { firebase } from "../../../../firebase.config";
import UserContext from "../../../Contexts/UserContext";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewJobPrompt: FC<Props> = ({ setOpen }) => {
  const [eventName, setEventName] = useState("");
  const user = useContext(UserContext);

  const createEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const create_event = firebase.functions().httpsCallable("create_event");
    try {
      await create_event({
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
        eventName,
      });
    } catch (error) {
      alert(error.toString());
    }
    setOpen(false);
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Create Event
      </h3>
      <div className="mt-2 max-w-xl text-sm text-gray-500">
        <p>Enter your event name to create a new event</p>
      </div>
      <form onSubmit={createEvent} className="mt-5 sm:flex sm:items-center">
        <div className="w-full h-8 sm:max-w-xs">
          <label htmlFor="event_name" className="sr-only">
            Event name
          </label>
          <input
            type="text"
            name="event_name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            autoComplete="off"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full p-2 sm:text-sm border-gray-300 rounded-md"
            placeholder="Event name"
          />
        </div>
        <button
          type="submit"
          className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Create
        </button>
      </form>
    </div>
  );
};
export default NewJobPrompt;
