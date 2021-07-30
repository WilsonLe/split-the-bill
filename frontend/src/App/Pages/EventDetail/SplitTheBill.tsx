import React, { FC } from "react";
import ButtonPrimaryIcon from "../../Components/Button/ButtonPrimaryIcon";
import { BsLightning } from "react-icons/bs";

interface Props {}

const SplitTheBill: FC<Props> = () => {
  return (
    <ButtonPrimaryIcon Icon={BsLightning}>Split The Bill</ButtonPrimaryIcon>
  );
};

export default SplitTheBill;
