import { firebase } from "../firebase.config";

interface UserInfo {
  uid: string;
  photoURL: string;
  displayName: string;
  email: string;
}
interface UserInfos extends Array<UserInfo> {}

interface Event {
  id?: string;
  name: string;
  code: string;
  expenses: Expenses;
  members: string[];
  createdAt: firebase.firestore.Timestamp;
  creator: UserInfo;
}

interface Expense {
  [key: string]: number | firebase.firestore.Timestamp;
}

interface Expenses extends Array<Expense> {}

let dummyUserInfo: UserInfo;
let dummyUserInfos: UserInfos;
let dummyEvent: Event;
let dummyExpense: Expense;
export type { Event, UserInfo, UserInfos, Expense, Expenses };
export { dummyEvent, dummyUserInfo, dummyUserInfos, dummyExpense };
