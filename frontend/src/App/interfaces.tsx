import { firebase } from "../firebase.config";

interface UserInfo {
  uid: string;
  photoURL: string;
  displayName: string;
  email: string;
}
interface UserInfos extends Array<UserInfo> {}

interface Event {
  id: string;
  name: string;
  code: string;
  members: string[];
  createdAt: firebase.firestore.Timestamp;
  creator: UserInfo;
}

interface Expense {
  id?: string;
  user: string;
  amount: number;
  spentAt: firebase.firestore.Timestamp;
}

interface Expenses {
  [key: string]: Expense;
}

let dummyUserInfo: UserInfo;
let dummyUserInfos: UserInfos;
let dummyEvent: Event;
let dummyExpense: Expense;
let dummyExpenses: Expenses;

export type { Event, UserInfo, UserInfos, Expense, Expenses };
export {
  dummyEvent,
  dummyUserInfo,
  dummyUserInfos,
  dummyExpense,
  dummyExpenses,
};
