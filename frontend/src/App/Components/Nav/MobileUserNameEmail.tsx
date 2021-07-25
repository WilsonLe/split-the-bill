import React, { FC, useContext } from "react";
import UserContext from "../../Contexts/UserContext";
interface Props {}
const MobileUserNameEmail: FC<Props> = () => {
  const user = useContext(UserContext);

  return (
    <div className="ml-3">
      <div className="text-base font-medium text-white">
        {user?.displayName}
      </div>
      <div className="text-sm font-medium text-gray-400">{user?.email}</div>
    </div>
  );
};

export default MobileUserNameEmail;
