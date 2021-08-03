import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import classNames from "../../../utils/classNames";
import {
  DetailExpense,
  DetailExpenses,
  Expenses,
  UserInfos,
} from "../../interfaces";

interface Props {
  members: UserInfos;
  expenses: Expenses;
}

const ExpensesList: FC<Props> = ({ members, expenses }) => {
  const [detailExpenses, setDetailExpenses] = useState<DetailExpenses>([]);
  useEffect(() => {
    if (members && expenses) {
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

  const editHandler = (expense: DetailExpense) => {
    console.log(expense);
  };

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
                            <th scope="col" className="relative px-6 py-3 w-5">
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
                              <td className="px-3 py-4 w-5 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => editHandler(expense)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  <AiOutlineEdit size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ExpensesList;
