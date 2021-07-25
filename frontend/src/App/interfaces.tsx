import { firebase } from "../firebase.config";

interface Event {
  name: string;
  code: string;
  expenses: {
    [key: string]: number;
  };
  members: string[];
  createdAt: firebase.firestore.Timestamp;
  creator: {
    uid: string;
    photoURL: string;
    displayName: string;
    email: string;
  };
}
let dummyEvent: Event;

export type { Event };
export { dummyEvent };
