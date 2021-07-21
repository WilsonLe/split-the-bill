import React, { FC } from "react";
interface Props {}

const Content: FC<Props> = (props) => {
  return <div className="flex justify-between h-16">{props.children}</div>;
};
export default Content;
