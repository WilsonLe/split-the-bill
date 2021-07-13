const functions = require("firebase-functions");

// http request 1
exports.randomNumber = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);
  res.send(number.toString());
});

// http request 2
exports.toWilsonLe = functions.https.onRequest((req, res) => {
  res.redirect("https://www.wilsonle.me");
});

// http request 3
exports.create_event = functions.https.onCall((data, context) => {
  console.log(data);
  return "DONE";
});
