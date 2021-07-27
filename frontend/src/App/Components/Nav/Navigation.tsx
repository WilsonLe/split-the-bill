import React, { FC } from "react";
import classNames from "../../../utils/classNames";

interface Props {
  navigation:
    | {
        name: string;
        href: string;
        current: Boolean;
      }[];
}

const Navigation: FC<Props> = ({ navigation }) => {
  return (
    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "px-3 py-2 rounded-md text-sm font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};
export default Navigation;
