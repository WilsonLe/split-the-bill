import React, { FC } from "react";

interface Props {}

const MobileProfile: FC<Props> = ({ children }) => {
  return <div className="pt-4 pb-3 border-t border-gray-700"> {children}</div>;
};
export default MobileProfile;
