import React, { FC } from "react";

interface Props {}

const MobileUserInfo: FC<Props> = ({ children }) => {
  return <div className="flex items-center px-5 sm:px-6">{children}</div>;
};
export default MobileUserInfo;
