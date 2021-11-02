import React, { FC, useState } from "react";
import { ButtonPrimary, ButtonRed } from "../../../Components/Button";
import { db } from "../../../../firebase.config";
import { DetailExpense, Event } from "../../../interfaces";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

interface Props {
  currentEvent: Event;
  expense: DetailExpense;
  buttonRef: HTMLButtonElement | null | undefined;
}

const EditExpensePrompt: FC<Props> = ({ currentEvent, expense, buttonRef }) => {
  const [note, setNote] = useState(expense?.description);
  const [amount, setAmount] = useState<number | string>(expense?.amount);
  const [noteError, setNoteError] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");

  const editAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountError("");
    setAmount(e.target.value);
  };

  const editNoteHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteError("");
    setNote(e.target.value);
  };
  const editExpenseHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amountNumber = Number(amount);
    if (amountNumber < 0) {
      setAmountError("Amount must be positive");
      return;
    }
    if (note === "") {
      setNoteError("Item note not specified");
      return;
    }
    if (currentEvent) {
      if (note !== expense.description || amount !== expense.amount) {
        try {
          await updateDoc(
            doc(db, "events", currentEvent.code, "expenses", expense.id),
            {
              description: note,
              amount: amountNumber,
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
    buttonRef?.click();
  };

  const deleteExpenseHandler = async () => {
    if (currentEvent) {
      try {
        await deleteDoc(
          doc(db, "events", currentEvent.code, "expenses", expense.id)
        );
      } catch (error) {
        console.log(error);
      }
    }
    buttonRef?.click();
  };

  return (
    <>
      <div className="px-4 py-5 sm:p-6 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-80">
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 inline-block">
            Edit expense
          </h3>
          <span className="mx-8"></span>
          <ButtonRed onClick={deleteExpenseHandler}>Delete</ButtonRed>
        </div>

        <form
          onSubmit={editExpenseHandler}
          className="mt-5 flex-col sm:flex sm:items-center"
        >
          <div className="flex flex-row justify-between">
            <div className="inline-block w-7/12 h-8 my-4 mr-2 sm:mr-4">
              <label htmlFor="expense note" className="sr-only">
                Note
              </label>
              <input
                type="text"
                name="expense note"
                value={note}
                onChange={editNoteHandler}
                autoComplete="off"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full p-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Note"
              />
            </div>
            <div className="inline-block w-4/12 h-8 my-4 mr-2 sm:mr-4">
              <label htmlFor="expense amount" className="sr-only">
                Amount
              </label>
              <input
                type="number"
                name="expense amount"
                value={amount}
                onChange={editAmountHandler}
                autoComplete="off"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full h-full p-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="Amount"
              />
            </div>
          </div>
          {noteError !== "" && (
            <span className="pb-3 w-full text-sm text-red-500 text-left">
              {noteError}
            </span>
          )}
          {amountError !== "" && (
            <span className="pb-3 w-full text-sm text-red-500 text-left">
              {amountError}
            </span>
          )}
          <div>
            <ButtonPrimary type="submit" className="w-full justify-center">
              Save changes
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditExpensePrompt;
