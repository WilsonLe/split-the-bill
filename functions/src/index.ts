import * as functions from "firebase-functions";
import { helloWorld } from "./Handlers";

export const hello_world = functions.https.onCall((data, context) =>
  helloWorld(data, context)
);
