import React, { FC } from "react";
import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
  as: "button" | "div";
}

const ButtonCircle: FC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  Icon,
  as,
  ...props
}) => {
  if (as === "button") {
    return (
      <button
        {...props}
        type="button"
        className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    );
  } else if (as === "div") {
    return (
      <div className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
    );
  } else {
    return (
      <div className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
    );
  }
};

export default ButtonCircle;
