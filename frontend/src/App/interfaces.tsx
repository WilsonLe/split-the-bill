interface Event {
  name: string;
  code: string;
  expenses: {
    [key: string]: number;
  };
  members: string[];
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
