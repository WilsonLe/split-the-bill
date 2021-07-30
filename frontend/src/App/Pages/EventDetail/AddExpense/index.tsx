import React, { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import ButtonCircle from "../../../Components/Button/ButtonCircle";

interface Props {}

const AddExpense: FC<Props> = () => {
  return <ButtonCircle Icon={AiOutlinePlus} />;
};

export default AddExpense;
