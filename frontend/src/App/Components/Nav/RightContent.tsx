import React, { FC } from "react";
interface Props {}

const RightContent: FC<Props> = ({ children }) => {
  return <div className="flex items-center">{children}</div>;
};
export default RightContent;
