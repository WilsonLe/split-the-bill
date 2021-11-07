import React, { FC } from "react";
import classNames from "../../../utils/classNames";

interface Props {
  navigation: {
    name: string;
    href: string;
    current: boolean;
  }[];
}
const MobileNavigation: FC<Props> = ({ navigation }) => {
  return (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block px-3 py-2 rounded-md text-base font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};
export default MobileNavigation;
