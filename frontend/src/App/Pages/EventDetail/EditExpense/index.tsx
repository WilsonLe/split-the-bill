import { Popover } from "@headlessui/react";
import React, { FC, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { usePopper } from "react-popper";
import { DetailExpense, Event } from "../../../interfaces";

import EditExpensePrompt from "./EditExpensePrompt";

interface Props {
  currentEvent: Event;
  expense: DetailExpense;
}

const EditExpense: FC<Props> = ({ currentEvent, expense }) => {
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>();
  const [popperRef, setPopperRef] = useState<HTMLDivElement | null>();
  const { styles, attributes } = usePopper(buttonRef, popperRef, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  return (
    <>
      <Popover>
        <>
          <Popover.Button ref={setButtonRef}>
            <AiOutlineEdit size={18} />
          </Popover.Button>

          <Popover.Panel
            ref={setPopperRef}
            style={styles.popper}
            {...attributes.popper}
          >
            <EditExpensePrompt
              currentEvent={currentEvent}
              expense={expense}
              buttonRef={buttonRef}
            />
          </Popover.Panel>
        </>
      </Popover>
    </>
  );
};

export default EditExpense;
