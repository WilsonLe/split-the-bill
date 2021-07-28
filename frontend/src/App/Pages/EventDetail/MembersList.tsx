import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import React, { FC } from "react";
import classNames from "../../../utils/classNames";
import { UserInfos } from "../../interfaces";

interface Props {
  members: UserInfos;
}

const MembersList: FC<Props> = ({ members }) => {
  return (
    <div className="bg-white px-6 py-8 border-b border-gray-200 sm:px-6 ">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button>
              <div className="flex items-center">
                <ChevronRightIcon
                  className={classNames(
                    open ? "transform rotate-90" : "",
                    "h-6 w-6 text-gray-800 inline"
                  )}
                />
                <h3 className="text-md w-full leading-8 font-small text-gray-800">
                  Members
                </h3>
              </div>
            </Disclosure.Button>

            <Disclosure.Panel>
              <ul className="divide-y divide-gray-200">
                {members &&
                  members.map((member) => (
                    <li key={member.email} className="py-4 flex">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={member.photoURL}
                        alt=""
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {member.displayName}
                        </p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default MembersList;
