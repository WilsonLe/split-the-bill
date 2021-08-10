import React, { FC, useContext, useState } from "react";
import { ButtonRed } from "../../../Components/Button";
import { db } from "../../../../firebase.config";
import UserContext from "../../../Contexts/UserContext";
import { DetailExpense, Event, Expense } from "../../../interfaces";

interface Props {
  currentEvent: Event;
  expense: DetailExpense;
  buttonRef: HTMLButtonElement | null | undefined;
}

const EditExpensePrompt: FC<Props> = ({ currentEvent, expense, buttonRef }) => {
  const user = useContext(UserContext);
  const [note, setNote] = useState(expense?.description);
  const [amount, setAmount] = useState<number | string>(expense?.amount);

  const editExpenseHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentEvent) {
      if (note !== expense.description || amount !== expense.amount) {
        const updatedExpenseList = currentEvent.expenses.filter(
          (e) => e.id !== expense.id
        );
        updatedExpenseList.push({
          ...expense,
          user: user?.uid,
          description: note,
          amount,
        } as Expense);
        try {
          await db
            .collection("events")
            .doc(currentEvent.code)
            .update({
              ...currentEvent,
              expenses: updatedExpenseList,
            } as Event);
        } catch (error) {
          console.log(error);
        }
      }
    }
    buttonRef?.click();
  };

  const deleteExpenseHandler = async () => {
    if (currentEvent) {
      const updatedExpenseList = currentEvent.expenses.filter(
        (e) => e.id !== expense.id
      );
      try {
        await db
          .collection("events")
          .doc(currentEvent.code)
          .update({
            ...currentEvent,
            expenses: updatedExpenseList,
          } as Event);
      } catch (error) {
        console.log(error);
      }
    }
    buttonRef?.click();
  };

  return (
    <>
      <div className="px-4 py-5 sm:p-6 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
        <div className="flex justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900 inline-block">
            Edit expense
          </h3>
          <ButtonRed onClick={deleteExpenseHandler}>Delete</ButtonRed>
        </div>

        <form
          onSubmit={editExpenseHandler}
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
              onChange={(e) => setNote(e.target.value)}
              autoComplete="off"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full p-2 sm:text-sm border-gray-300 rounded-md"
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
              onChange={(e) => setAmount(e.target.value)}
              autoComplete="off"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full p-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Amount"
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditExpensePrompt;
