import React, { FC } from "react";

interface Props {}

const Logo: FC<Props> = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <img
        className="block lg:hidden h-14 w-auto"
        src="https://i.ibb.co/zGK9TVQ/unnamed.png"
        alt="Split The Bill logo"
      />
      <img
        className="hidden lg:block h-14 w-auto"
        src="https://i.ibb.co/zGK9TVQ/unnamed.png"
        alt="Split The Bill logo"
      />
    </div>
  );
};
export default Logo;
