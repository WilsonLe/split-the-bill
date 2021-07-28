import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import React, { FC, useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import classNames from "../../../utils/classNames";
import { dummyUserInfos, UserInfo, UserInfos } from "../../interfaces";

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
              {members &&
                members.map((member) => (
                  <div key={member.uid}>
                    <p>{member.displayName}</p>
                    <p>{member.email}</p>
                    <p>{member.photoURL}</p>
                  </div>
                ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default MembersList;
