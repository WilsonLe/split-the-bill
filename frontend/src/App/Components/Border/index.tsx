import React, { FC } from "react";

interface Props {}

const Border: FC<Props> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  );
};
export default Border;
