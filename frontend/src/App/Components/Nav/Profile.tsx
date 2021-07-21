import React, { FC } from "react";

import Bell from "./Bell";
import Dropdown from "./Dropdown";

interface Props {
  open: Boolean;
  userNavigation: { name: string; href: string }[];
}

const Profile: FC<Props> = ({ open, userNavigation }) => {
  return (
    <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
      <Bell />
      <Dropdown open={open} userNavigation={userNavigation} />
    </div>
  );
};
export default Profile;
