import { firebase } from "../firebase.config";

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
  members: UserInfos;
  membersUid: string[];
  expenses: Expenses;
  createdAt: firebase.firestore.Timestamp;
  creator: UserInfo;
}

interface Expense {
  id: string;
  user: string;
  amount: number;
  description: string;
  spentAt: firebase.firestore.Timestamp;
}

interface DetailExpense extends Omit<Expense, "user"> {
  user: UserInfo;
}

interface Version {
  createdAt: firebase.firestore.Timestamp;
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
  dummyUserInfo,
  dummyUserInfos,
  dummyExpense,
  dummyExpenses,
  dummyDetailExpense,
  dummyDetailExpenses,
};
