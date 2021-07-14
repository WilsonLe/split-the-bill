const functions = require("firebase-functions");
const handlers = require("./handlers");

// http request 3
exports.create_event = functions.https.onCall((data, context) => {
  return handlers.create_event(data, context);
});
