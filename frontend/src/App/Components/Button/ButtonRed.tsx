import React, { FC } from "react";

interface Props {}

const ButtonRed: FC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      type="button"
      className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    >
      {children}
    </button>
  );
};

export default ButtonRed;
