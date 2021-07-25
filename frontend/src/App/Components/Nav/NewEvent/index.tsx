import React, { FC, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import useOnClickOutside from "../../../../utils/useOnClickOutside";

import { dummyEvent } from "../../../interfaces";

import Popup from "../../Popup";
import NewJobButton from "./NewJobButton";
import NewJobPrompt from "./NewJobPrompt";
import { ButtonWhite } from "../../Button";

interface Props {}

const NewEvent: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [showEventLink, setShowEventLink] = useState(false);
  const [newEventData, setNewEventData] = useState(dummyEvent);
  const [copyEventCode, setCopyEventCode] = useState(false);

  const NewJobRef = useRef(null);
  useOnClickOutside(NewJobRef, () => setOpen(false));

  const copyEventCodeHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setCopyEventCode(true);
    navigator.clipboard.writeText(
      `${window.location}event/${newEventData?.code}`
    );
  };

  const closePopupHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setShowEventLink(false);
    setCopyEventCode(false);
  };

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
              setNewEventData={setNewEventData}
            />
          )}
        </Transition>
      </div>
      {showEventLink && (
        <Popup open={showEventLink} setOpen={setShowEventLink}>
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckIcon
                className="h-6 w-6 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                Create Event Success
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500 text-left p-4 mb-4 border border-gray-300 shadow-sm rounded-sm">
                  {`${window.location}event/${newEventData?.code}`}
                </p>
                <div>
                  <ButtonWhite onClick={copyEventCodeHandler}>Copy</ButtonWhite>
                  {copyEventCode && (
                    <span className="absolute text-xs text-green-500">
                      copied
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={closePopupHandler}
            >
              Done
            </button>
          </div>
        </Popup>
      )}
    </>
  );
};
export default NewEvent;
