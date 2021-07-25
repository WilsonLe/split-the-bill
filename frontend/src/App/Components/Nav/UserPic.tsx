import React, { FC, useContext } from "react";
import { Menu } from "@headlessui/react";
import UserContext from "../../Contexts/UserContext";

interface Props {}

const UserPic: FC<Props> = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src={user?.photoURL || undefined}
          alt=""
        />
      </Menu.Button>
    </div>
  );
};
export default UserPic;
