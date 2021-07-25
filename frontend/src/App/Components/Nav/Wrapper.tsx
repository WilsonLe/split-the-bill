import React, { FC } from "react";
import { Disclosure } from "@headlessui/react";
interface Props {}

const Wrapper: FC<Props> = (props) => {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {props.children}
    </Disclosure>
  );
};
export default Wrapper;
