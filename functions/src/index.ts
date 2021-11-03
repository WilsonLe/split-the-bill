import * as functions from "firebase-functions";

exports.removeOldEvent = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone("America/New_York")
  .onRun((context) => {
    console.log("runs everyday at midnight, NY timezone");
  });
