import React, { FC } from "react";

interface Props {
  userNavigation: { name: string; href: string }[];
}

const MobileUserNavigation: FC<Props> = ({ userNavigation }) => {
  return (
    <div className="mt-3 px-2 space-y-1 sm:px-3">
      {userNavigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};
export default MobileUserNavigation;
