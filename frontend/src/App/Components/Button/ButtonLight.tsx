import React, { FC } from "react";

interface Props {}

const ButtonLight: FC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      type="button"
      className="inline-flex items-center justify-center w-full mt-3 px-4 py-2 border border-gray-300 shadow-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
    >
      {children}
    </button>
  );
};

export default ButtonLight;
