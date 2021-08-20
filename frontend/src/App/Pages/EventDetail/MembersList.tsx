import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import React, { FC } from "react";
import classNames from "../../../utils/classNames";
import { UserInfo, UserInfos } from "../../interfaces";

interface Props {
  members: UserInfos;
  creator: UserInfo;
}

const MembersList: FC<Props> = ({ members, creator }) => {
  return (
    <div className="bg-white px-6 py-8 border-b border-gray-200 sm:px-6 ">
      <Disclosure defaultOpen={true}>
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
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members &&
                  members.map((member) => (
                    <li
                      key={member.email}
                      className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
                    >
                      <div className="w-full flex items-center justify-between p-6 space-x-6">
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-gray-900 text-sm font-medium truncate">
                              {member.displayName}
                            </h3>
                            {member.uid === creator.uid && (
                              <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                creator
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-gray-500 text-sm truncate">
                            {member.email}
                          </p>
                        </div>
                        <img
                          className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                          src={member.photoURL}
                          alt=""
                        />
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
