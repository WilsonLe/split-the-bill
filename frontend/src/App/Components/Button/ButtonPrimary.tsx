import React, { FC } from "react";
import { IconType } from "react-icons";

interface Props {}

const ButtonPrimary: FC<
  Props & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
      ${props.className} `}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
