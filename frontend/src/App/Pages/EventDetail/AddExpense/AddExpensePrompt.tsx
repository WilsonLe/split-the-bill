import React, { FC, useState } from "react";
import { Event } from "../../../interfaces";

interface Props {
  currentEvent: Event;
  setCurrentEvent: React.Dispatch<React.SetStateAction<Event>>;
}

const AddExpensePrompt: FC<Props> = ({ currentEvent, setCurrentEvent }) => {
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState<string | number>(0);

  const addExpenseHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const noteChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <>
      <div className="px-4 py-5 sm:p-6 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Add expense
        </h3>
        <form
          onSubmit={addExpenseHandler}
          className="mt-5 sm:flex sm:items-center"
        >
          <div className="w-full h-8 my-4 sm:mr-4">
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
          <div className="w-full h-8 my-4 sm:w-40">
            <label htmlFor="expense amount" className="sr-only">
              Amount
            </label>
            <input
              type="number"
              name="expense amount"
              value={amount}
              onChange={amountChangeHandler}
              autoComplete="off"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full p-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Amount"
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddExpensePrompt;
