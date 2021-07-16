const { v4: uuidv4 } = require("uuid");
const db = require("../../firebase.config");

const create_event = async (data, context) => {
  const name = `${data.name} (${data.email})`;
  const event = {
    creator: name,
    code: uuidv4(),
    members: [name],
    expenses: {},
  };
  event["members"].forEach((member) => (event["expenses"][member] = 0));
  const res = await db.collection("events").add(event);
  return JSON.stringify(res);
};

module.exports = create_event;
