import React, { FC, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Event } from "../../interfaces";
import { ButtonLight } from "../Button";
import { BasePopup } from ".";

interface Props {
  showEventLink: boolean;
  setShowEventLink: React.Dispatch<React.SetStateAction<boolean>>;
  currentEvent: Event;
  title: string;
}

const EventCode: FC<Props> = ({
  showEventLink,
  setShowEventLink,
  currentEvent,
  title,
}) => {
  const [copyEventCode, setCopyEventCode] = useState(false);

  const copyEventCodeHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setCopyEventCode(true);
    navigator.clipboard.writeText(
      `${window.location}event/${currentEvent?.code}`
    );
  };

  return (
    <>
      <BasePopup open={showEventLink} setOpen={setShowEventLink}>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            {title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500 text-left p-4 mb-4 border border-gray-300 shadow-sm rounded-sm">
              {`${window.location.origin}/event?code=${currentEvent?.code}`}
            </p>
            <div>
              <ButtonLight onClick={copyEventCodeHandler}>Copy</ButtonLight>
              {copyEventCode && (
                <span className="absolute text-xs text-green-500">copied</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => {
              setShowEventLink(false);
              setCopyEventCode(false);
            }}
          >
            Done
          </button>
        </div>
      </BasePopup>
    </>
  );
};

export default EventCode;
