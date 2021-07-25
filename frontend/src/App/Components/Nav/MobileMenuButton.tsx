import React, { FC } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
interface Props {
  open: boolean;
}

const MobileMenuButton: FC<Props> = ({ open }) => {
  return (
    <div className="-ml-2 mr-2 flex items-center md:hidden">
      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        <span className="sr-only">Open main menu</span>
        {open ? (
          <XIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
        )}
      </Disclosure.Button>
    </div>
  );
};
export default MobileMenuButton;
