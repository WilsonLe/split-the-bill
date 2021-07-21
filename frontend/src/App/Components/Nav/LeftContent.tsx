import React, { FC } from "react";
interface Props {}

const LeftContent: FC<Props> = (props) => {
  return <div className="flex">{props.children}</div>;
};
export default LeftContent;
