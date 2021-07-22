import React, { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import NewJobButton from "./NewJobButton";

interface Props {}

const NewJob: FC<Props> = () => {
  return (
    <>
      <div className="flex-shrink-0">
        <Menu as="div" className="relative inline-block">
          {({ open }) => (
            <>
              <NewJobButton />
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <div>HELLO</div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </>
  );
};
export default NewJob;
