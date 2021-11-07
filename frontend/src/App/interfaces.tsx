import { Timestamp } from "firebase/firestore";

interface UserInfo {
  uid: string;
  photoURL: string;
  displayName: string;
}
interface UserInfos extends Array<UserInfo> {}

interface Event {
  id: string;
  name: string;
  code: string;
  expenses: Expenses;
  members: UserInfos;
  membersUid: string[];
  createdAt: Timestamp;
  creator: UserInfo;
}

export interface EventWithoutMemberExpense
  extends Omit<Event, "expenses" | "members" | "membersUid"> {}

interface Expense {
  id: string;
  user: string;
  amount: number;
  description: string;
  spentAt: Timestamp;
}

interface DetailExpense extends Omit<Expense, "user"> {
  user: UserInfo;
}

interface Version {
  createdAt: Timestamp;
  note: string;
  version: string;
}

interface Versions extends Array<Version> {}

interface DetailExpenses extends Array<DetailExpense> {}

interface Expenses extends Array<Expense> {}

let dummyUserInfo: UserInfo;
let dummyUserInfos: UserInfos;
let dummyEvent: Event;
let dummyExpense: Expense;
let dummyEventWithoutExpense: EventWithoutMemberExpense;
let dummyExpenses: Expenses;
let dummyDetailExpense: DetailExpense;
let dummyDetailExpenses: DetailExpenses;

export type {
  Version,
  Versions,
  Event,
  UserInfo,
  UserInfos,
  Expense,
  Expenses,
  DetailExpense,
  DetailExpenses,
};
export {
  dummyEvent,
  dummyEventWithoutExpense,
  dummyUserInfo,
  dummyUserInfos,
  dummyExpense,
  dummyExpenses,
  dummyDetailExpense,
  dummyDetailExpenses,
};
