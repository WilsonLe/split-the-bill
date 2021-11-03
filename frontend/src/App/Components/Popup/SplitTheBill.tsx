import React, { FC, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

import { ButtonPrimary } from "../Button";
import { BasePopup } from ".";
import { Event, UserInfos } from "../../interfaces";

import { v4 as uuidv4 } from "uuid";

interface Props {
  showBill: boolean;
  setShowBill: React.Dispatch<React.SetStateAction<boolean>>;
  currentEvent: Event;
  members: UserInfos;
}

interface MemberExpense {
  [key: string]: number;
}

interface ExpenseListByMember {
  [key: string]: MemberExpense;
}

interface ExpenseByMember {
  [key: string]: number;
}

interface Transaction {
  amount: number;
  payer: string;
  receiver: string;
}

interface Transactions extends Array<Transaction> {}

const SplitTheBillPopup: FC<Props> = ({
  showBill,
  setShowBill,
  currentEvent,
  members,
}) => {
  const [transactions, setTransactions] = useState<Transactions>([]);

  useEffect(() => {
    // right now, if user add expense, this runs 3 times.
    // if user delete expense, this run 2 times.
    // will attempt to look into this
    if (currentEvent && members) {
      const expenseListByMember: ExpenseListByMember = {};
      members.forEach((member) => {
        const tempMemberExpense: MemberExpense = {};
        currentEvent.expenses.forEach((expense) => {
          if (expense.user === member.uid) {
            tempMemberExpense[expense.description] = expense.amount;
          }
        });
        expenseListByMember[member.displayName] = tempMemberExpense;
      });

      const totalExpenseByMember: ExpenseByMember = {};
      for (const memberName in expenseListByMember) {
        totalExpenseByMember[memberName] = 0;
        for (const expenseName in expenseListByMember[memberName]) {
          // adding "+" converts into number when ts is translated to js.
          const expenseAmount = +expenseListByMember[memberName][expenseName];
          totalExpenseByMember[memberName] += expenseAmount;
        }
      }

      let total = 0;
      for (const memberName in totalExpenseByMember) {
        const expense = totalExpenseByMember[memberName];
        total += expense;
      }
      const average = total / Object.keys(totalExpenseByMember).length;

      const payers: ExpenseByMember = {};
      const receivers: ExpenseByMember = {};
      for (const memberName in totalExpenseByMember) {
        const expense = totalExpenseByMember[memberName];
        if (expense === average) continue;
        else if (expense > average) receivers[memberName] = expense;
        else payers[memberName] = expense;
      }

      for (const p in payers) payers[p] = Math.abs(average - payers[p]);
      for (const r in receivers)
        receivers[r] = Math.abs(average - receivers[r]);

      const transactions = [];
      for (const r in receivers) {
        for (const p in payers) {
          if (receivers[r] === payers[p]) {
            transactions.push({
              receiver: r,
              payer: p,
              amount: payers[p],
            });
          } else if (receivers[r] > payers[p]) {
            receivers[r] -= payers[p];
            transactions.push({
              receiver: r,
              payer: p,
              amount: payers[p],
            });
          } else {
            payers[p] -= receivers[r];
            transactions.push({
              receiver: r,
              payer: p,
              amount: receivers[r],
            });
          }
        }
      }
      setTransactions(transactions);
    }
  }, [currentEvent, members]);
  return (
    <>
      <BasePopup open={showBill} setOpen={setShowBill}>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            Split The Bill
          </Dialog.Title>
        </div>

        <div className="mt-5 sm:mt-6">
          <div className="my-4 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Payer
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Receiver
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={uuidv4()}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.payer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.receiver}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <ButtonPrimary
            type="button"
            className="w-full justify-center"
            onClick={() => setShowBill(false)}
          >
            Done
          </ButtonPrimary>
        </div>
      </BasePopup>
    </>
  );
};

export default SplitTheBillPopup;
