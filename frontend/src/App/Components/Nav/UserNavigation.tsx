import React, { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import UserPic from "./UserPic";
import classNames from "../../../utils/classNames";

interface Props {
  open: boolean;
  userNavigation: { name: string; href: string }[];
}

const UserNavigation: FC<Props> = ({ userNavigation }) => {
  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <UserPic />
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
export default UserNavigation;
