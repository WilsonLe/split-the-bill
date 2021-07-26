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
  expenses: {
    [key: string]: number;
  };
  members: string[];
  createdAt: firebase.firestore.Timestamp;
  creator: UserInfo;
}

let dummyUserInfo: UserInfo;
let dummyUserInfos: UserInfos;
let dummyEvent: Event;
export type { Event, UserInfo, UserInfos };
export { dummyEvent, dummyUserInfo, dummyUserInfos };
