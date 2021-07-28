import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import React, { FC, useEffect, useState } from "react";
import classNames from "../../../utils/classNames";
import { DetailExpenses, Expenses, UserInfos } from "../../interfaces";

interface Props {
  members: UserInfos;
  expenses: Expenses;
}

const ExpensesList: FC<Props> = ({ members, expenses }) => {
  const [detailExpense, setDetailExpense] = useState<DetailExpenses>([]);
  useEffect(() => {
    if (members && expenses) {
      const tempDetailExpense = expenses.map((expense) => {
        const user = members.find((member) => member.uid === expense.user);
        console.log(members);
        return { ...expense, user };
      }) as DetailExpenses;
      console.log(tempDetailExpense);
      setDetailExpense(tempDetailExpense);
    }
  }, [members, expenses]);
  return (
    <div className="bg-white px-6 py-8 border-b border-gray-200 sm:px-6 ">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button>
              <div className="flex items-center">
                <ChevronRightIcon
                  className={classNames(
                    open ? "transform rotate-90" : "",
                    "h-6 w-6 text-gray-800 inline"
                  )}
                />
                <h3 className="text-md w-full leading-8 font-small text-gray-800">
                  Expenses
                </h3>
              </div>
            </Disclosure.Button>

            <Disclosure.Panel>
              {expenses &&
                expenses.map((expense) => (
                  <div key={expense.id}>
                    <p>{expense.user}</p>
                  </div>
                ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ExpensesList;
