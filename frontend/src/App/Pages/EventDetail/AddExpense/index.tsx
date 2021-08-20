import React, { FC, useState } from "react";
import { usePopper } from "react-popper";

import { AiOutlinePlus } from "react-icons/ai";

import ButtonCircle from "../../../Components/Button/ButtonCircle";
import { Event } from "../../../interfaces";
import { Popover } from "@headlessui/react";
import AddExpensePrompt from "./AddExpensePrompt";

interface Props {
  currentEvent: Event;
  setCurrentEvent: React.Dispatch<React.SetStateAction<Event>>;
}

const AddExpense: FC<Props> = ({ currentEvent, setCurrentEvent }) => {
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>();
  const [popperRef, setPopperRef] = useState<HTMLDivElement | null>();
  const { styles, attributes } = usePopper(buttonRef, popperRef, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return (
    <>
      <Popover>
        <>
          <Popover.Button ref={setButtonRef}>
            <ButtonCircle Icon={AiOutlinePlus} as="div" />
          </Popover.Button>

          <Popover.Panel
            ref={setPopperRef}
            style={styles.popper}
            {...attributes.popper}
          >
            <AddExpensePrompt
              currentEvent={currentEvent}
              setCurrentEvent={setCurrentEvent}
              buttonRef={buttonRef}
            />
          </Popover.Panel>
        </>
      </Popover>
    </>
  );
};

export default AddExpense;
