import { Dialog } from "@headlessui/react";
import React, { FC } from "react";
import { BasePopup } from ".";
import { Event } from "../../interfaces";
import { ButtonLight, ButtonRed } from "../Button";

interface Props {
  showConfirmDelete: boolean;
  setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  currentEvent: Event;
  deleteEventHandler: (currentEvent: Event) => Promise<void>;
}

const ConfirmDelete: FC<Props> = ({
  showConfirmDelete,
  setShowConfirmDelete,
  currentEvent,
  deleteEventHandler,
}) => {
  return (
    <BasePopup open={showConfirmDelete} setOpen={setShowConfirmDelete}>
      <div className="mt-3 text-center sm:mt-5">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 font-medium text-gray-900"
        >
          Delete event {currentEvent?.name}?
        </Dialog.Title>
        <div className="mt-2">
          <div className="my-2">
            <p className="text-sm text-red-500">This action cannot be undone</p>
          </div>
          <div className="flex justify-center">
            <ButtonLight onClick={() => setShowConfirmDelete(false)}>
              Cancel
            </ButtonLight>
            <span className="w-4"></span>
            <ButtonRed
              onClick={() => {
                setShowConfirmDelete(false);
                deleteEventHandler(currentEvent);
              }}
            >
              Delete
            </ButtonRed>
          </div>
        </div>
      </div>
    </BasePopup>
  );
};

export default ConfirmDelete;
