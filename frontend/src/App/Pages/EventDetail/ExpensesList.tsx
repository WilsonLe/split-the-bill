import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import React, { FC, useContext, useEffect, useState } from "react";

import classNames from "../../../utils/classNames";
import UserContext from "../../Contexts/UserContext";
import { DetailExpenses, Event, Expenses, UserInfos } from "../../interfaces";
import EditExpense from "./EditExpense";

interface Props {
  currentEvent: Event;
  members: UserInfos;
  expenses: Expenses;
}

const ExpensesList: FC<Props> = ({ currentEvent, members, expenses }) => {
  const user = useContext(UserContext);
  const [detailExpenses, setDetailExpenses] = useState<DetailExpenses>([]);

  // set detail expense (expense with user info)
  useEffect(() => {
    if (members.length > 0 && expenses.length > 0) {
      const sortedExpense = expenses.sort(
        (a, b) => b.spentAt.toMillis() - a.spentAt.toMillis()
      );
      const tempDetailExpense = sortedExpense.map((expense) => {
        const user = members.find((member) => member.uid === expense.user);
        return { ...expense, user };
      }) as DetailExpenses;
      setDetailExpenses(tempDetailExpense);
    }
  }, [members, expenses]);

  return (
    <div className="bg-white px-6 py-8 border-b border-gray-200 sm:px-6 ">
      <Disclosure defaultOpen={true}>
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
              {expenses.length > 0 ? (
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-3 w-1/4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                User
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 w-full text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Description
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 w-12 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Amt.
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 w-15 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:block"
                              >
                                Time
                              </th>
                              <th
                                scope="col"
                                className="relative px-6 py-3 w-5"
                              >
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {detailExpenses.map((expense) => (
                              <tr key={expense.id}>
                                <td className="px-3 py-4 w-1/4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 hidden sm:flex">
                                      <img
                                        className="h-10 w-10 rounded-full"
                                        src={expense.user.photoURL}
                                        alt=""
                                      />
                                    </div>
                                    <div className="sm:ml-4">
                                      <div className="text-sm font-small text-gray-900">
                                        {expense.user.displayName}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-3 py-4 w-full whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {expense.description}
                                  </div>
                                </td>
                                <td className="px-3 py-4 w-12 whitespace-nowrap text-center">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    + {expense.amount}
                                  </span>
                                </td>
                                <td className="px-3 py-4 w-15 whitespace-nowrap text-xs text-gray-900 hidden sm:block">
                                  <div>
                                    {expense.spentAt
                                      .toDate()
                                      .toLocaleDateString()}
                                  </div>
                                  <div>
                                    {expense.spentAt
                                      .toDate()
                                      .toLocaleTimeString()}
                                  </div>
                                </td>
                                {(currentEvent.creator.uid === user?.uid ||
                                  expense.user.uid === user?.uid) && (
                                  <td className="px-3 py-4 w-5 whitespace-nowrap text-right text-sm font-medium">
                                    <EditExpense
                                      currentEvent={currentEvent}
                                      expense={expense}
                                    />
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="p-6 text-center">
                          <span className="text-gray-500 text-lg">
                            No expense created
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ExpensesList;
