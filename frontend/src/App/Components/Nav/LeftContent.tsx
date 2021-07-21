import React, { FC } from "react";
interface Props {}

const LeftContent: FC<Props> = ({ children }) => {
  return <div className="flex">{children}</div>;
};
export default LeftContent;
