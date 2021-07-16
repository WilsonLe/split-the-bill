const { v4: uuidv4 } = require("uuid");
const db = require("../../firebase.config");
const functions = require("firebase-functions");

const create_event = async (data, context) => {
  const { uid, name, email } = data;
  const event = {
    creator: uid,
    code: uuidv4(),
    members: [uid],
    expenses: {
      [`${name} (${email})`]: 0,
    },
  };
  try {
    const docRef = await db.collection("events").add(event);
    const newEventRef = await docRef.get();
    const newEvent = await newEventRef.data();
    return newEvent;
  } catch (error) {
    throw new functions.https.HttpsError("internal", "INTSVE", {
      message: error.message,
    });
  }
};

module.exports = create_event;
