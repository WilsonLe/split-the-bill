import React, { FC } from "react";

interface Props {}

const Profile: FC<Props> = ({ children }) => {
  return (
    <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
      {children}
    </div>
  );
};
export default Profile;
