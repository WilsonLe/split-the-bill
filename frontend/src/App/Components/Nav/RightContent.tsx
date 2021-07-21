import React, { FC } from "react";
interface Props {}

const RightContent: FC<Props> = (props) => {
  return <div className="flex items-center">{props.children}</div>;
};
export default RightContent;
