import React, { Children, FC } from "react";
import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
}

const ButtonPrimaryIcon: FC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  Icon,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Icon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
      {children}
    </button>
  );
};

export default ButtonPrimaryIcon;
