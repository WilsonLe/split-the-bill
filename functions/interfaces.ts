interface UserInfo {
  uid: string;
  photoURL: string;
  displayName: string;
  email: string;
}
interface UserInfos extends Array<UserInfo> {}

let dummyUserInfo: UserInfo;
let dummyUserInfos: UserInfos;

export type { UserInfo, UserInfos };
export { dummyUserInfo, dummyUserInfos };
