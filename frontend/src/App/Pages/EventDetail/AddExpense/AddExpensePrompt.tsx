import React, { FC, useContext, useState } from "react";
import UserContext from "../../../Contexts/UserContext";
import { db } from "../../../../firebase.config";
import { Event, Expense } from "../../../interfaces";
import { v4 as uuidv4 } from "uuid";
import { ButtonPrimary } from "../../../Components/Button";
import { Timestamp, doc, setDoc } from "firebase/firestore";

interface Props {
  currentEvent: Event;
  setCurrentEvent: React.Dispatch<React.SetStateAction<Event>>;
  buttonRef: HTMLButtonElement | null | undefined;
}

const AddExpensePrompt: FC<Props> = ({
  currentEvent,
  setCurrentEvent,
  buttonRef,
}) => {
  const user = useContext(UserContext);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState<string | number>("");
  const addExpenseHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && currentEvent) {
      const updatedExpenses = [...currentEvent.expenses];
      const updatedEvent = {
        ...currentEvent,
        expenses: updatedExpenses,
      };
      setCurrentEvent(updatedEvent);
      const id = uuidv4();
      try {
        await setDoc(doc(db, "events", currentEvent.code, "expenses", id), {
          id,
          user: user.uid,
          amount: amount as number,
          description: note,
          spentAt: Timestamp.now(),
        } as Expense);
      } catch (error) {
        console.log(error);
      }
      buttonRef?.click();
    }
  };

  const noteChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <>
      <div className="px-4 py-5 sm:p-6 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-80">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Add expense
        </h3>
        <form
          onSubmit={addExpenseHandler}
          className="mt-2 sm:flex sm:flex-col sm:items-center"
        >
          <div className="flex flex-row justify-between">
            <div className="inline-block w-7/12 h-8 my-4">
              <label htmlFor="expense note" className="sr-only">
                Note
              </label>
              <input
                type="text"
                name="expense note"
                value={note}
                onChange={noteChangeHandler}
                autoComplete="off"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full p-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Note"
              />
            </div>
            <div className="inline-block w-4/12 h-8 my-4">
              <label htmlFor="expense amount" className="sr-only">
                Amount
              </label>
              <input
                type="number"
                name="expense amount"
                value={amount ? amount : ""}
                onChange={amountChangeHandler}
                autoComplete="off"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full p-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Amount"
              />
            </div>
          </div>
          <ButtonPrimary type="submit" className="w-full justify-center">
            Add
          </ButtonPrimary>
        </form>
      </div>
    </>
  );
};

export default AddExpensePrompt;
