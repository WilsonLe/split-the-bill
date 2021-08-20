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
  createdAt: firebase.firestore.Timestamp;
  members: firebase.firestore.QueryDocumentSnapshot;
  expenses: firebase.firestore.QueryDocumentSnapshot;
}

interface Events extends Array<Event> {}

interface Member extends UserInfo {
  role: "creator" | "member";
}

interface Members extends Array<Member> {}

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

interface DetailExpenses extends Array<DetailExpense> {}

interface Expenses extends Array<Expense> {}

let dummyMember: Member;
let dummyMembers: Members;
let dummyUserInfo: UserInfo;
let dummyUserInfos: UserInfos;
let dummyEvent: Event;
let dummyExpense: Expense;
let dummyExpenses: Expenses;
let dummyDetailExpense: DetailExpense;
let dummyDetailExpenses: DetailExpenses;

export type {
  Event,
  Events,
  Member,
  Members,
  UserInfo,
  UserInfos,
  Expense,
  Expenses,
  DetailExpense,
  DetailExpenses,
};

export {
  dummyMember,
  dummyMembers,
  dummyEvent,
  dummyUserInfo,
  dummyUserInfos,
  dummyExpense,
  dummyExpenses,
  dummyDetailExpense,
  dummyDetailExpenses,
};
