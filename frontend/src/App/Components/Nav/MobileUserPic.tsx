import React, { FC, useContext } from "react";
import UserContext from "../../Contexts/UserContext";

interface Props {}

const MobileUserPic: FC<Props> = () => {
  const user = useContext(UserContext);
  return (
    <div className="flex-shrink-0">
      <img
        className="h-10 w-10 rounded-full"
        src={user?.photoURL || undefined}
        alt=""
      />
    </div>
  );
};
export default MobileUserPic;
