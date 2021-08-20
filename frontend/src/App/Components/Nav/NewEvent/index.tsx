import React, { FC, useRef, useState } from "react";
import { Transition } from "@headlessui/react";

import useOnClickOutside from "../../../../utils/useOnClickOutside";
import NewJobButton from "./NewJobButton";
import NewJobPrompt from "./NewJobPrompt";

import { dummyEvent } from "../../../interfaces";
import EventCode from "../../Popup/EventCode";

interface Props {}

const NewEvent: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [showEventLink, setShowEventLink] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(dummyEvent);

  const NewJobRef = useRef(null);
  useOnClickOutside(NewJobRef, () => setOpen(false));

  return (
    <>
      <div className="relative" ref={NewJobRef}>
        <NewJobButton open={open} setOpen={setOpen} />
        <Transition
          show={open}
          as="div"
          className="absolute origin-top-right right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {open && (
            <NewJobPrompt
              setOpen={setOpen}
              setShowEventLink={setShowEventLink}
              setCurrentEvent={setCurrentEvent}
            />
          )}
        </Transition>
      </div>
      <EventCode
        showEventLink={showEventLink}
        setShowEventLink={setShowEventLink}
        currentEvent={currentEvent}
        title={"Create Event Success"}
      />
    </>
  );
};
export default NewEvent;
