interface NewEventData {
  name: string;
  code: string;
  expenses: {
    [key: string]: number;
  };
  members: string[];
  creator: string;
}
let dummyNewEventData: NewEventData;

export type { NewEventData };
export { dummyNewEventData };
