import React, { FC } from "react";
import { Disclosure } from "@headlessui/react";

interface Props {}

const MobileMenuPanel: FC<Props> = ({ children }) => {
  return <Disclosure.Panel className="md:hidden">{children}</Disclosure.Panel>;
};
export default MobileMenuPanel;
