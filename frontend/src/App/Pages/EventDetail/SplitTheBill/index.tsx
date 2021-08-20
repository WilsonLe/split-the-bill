import React, { FC, useState } from "react";
import ButtonPrimaryIcon from "../../../Components/Button/ButtonPrimaryIcon";
import { BsLightning } from "react-icons/bs";
import SplitTheBillPopup from "../../../Components/Popup/SplitTheBill";
import { Event, UserInfos } from "../../../interfaces";

interface Props {
  currentEvent: Event;
  members: UserInfos;
}

const SplitTheBill: FC<Props> = ({ currentEvent, members }) => {
  const [showBill, setShowBill] = useState(false);
  return (
    <>
      <ButtonPrimaryIcon Icon={BsLightning} onClick={() => setShowBill(true)}>
        Split The Bill
      </ButtonPrimaryIcon>
      <SplitTheBillPopup
        showBill={showBill}
        setShowBill={setShowBill}
        currentEvent={currentEvent}
        members={members}
      />
    </>
  );
};

export default SplitTheBill;
