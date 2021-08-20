import React, { FC, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Event } from "../../interfaces";
import { ButtonLight, ButtonPrimary } from "../Button";
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
      `${window.location.origin}/event?code=${currentEvent?.code}`
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
            <div className="relative">
              <ButtonLight className="" onClick={copyEventCodeHandler}>
                {copyEventCode ? (
                  <span className="text-green-500">Copied</span>
                ) : (
                  <span>Copy</span>
                )}
              </ButtonLight>
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-6">
          <ButtonPrimary
            type="button"
            className="w-full justify-center"
            onClick={() => {
              setShowEventLink(false);
              setTimeout(() => setCopyEventCode(false), 250);
            }}
          >
            Done
          </ButtonPrimary>
        </div>
      </BasePopup>
    </>
  );
};

export default EventCode;
