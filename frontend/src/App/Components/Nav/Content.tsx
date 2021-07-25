import React, { FC } from "react";
interface Props {}

const Content: FC<Props> = ({ children }) => {
  return <div className="flex justify-between h-16">{children}</div>;
};
export default Content;
