import React, { FC } from "react";
import { BellIcon } from "@heroicons/react/outline";

interface Props {}

const MobileBell: FC<Props> = () => {
  return (
    <button className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};
export default MobileBell;
