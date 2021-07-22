import React, { FC } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { Menu } from "@headlessui/react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewJobButton: FC<Props> = ({ open, setOpen }) => {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
    >
      <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      <span>New Job</span>
    </button>
  );
};
export default NewJobButton;
