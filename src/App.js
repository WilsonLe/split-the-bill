import React from "react";
import { firebase } from "./firebaseConfig";

const App = () => {
  const trigger_create_event = async () => {
    const create_event = firebase.functions().httpsCallable("create_event");
    const res = await create_event({ hello: "world" });
    console.log(res);
  };
  return (
    <>
      <div>Hello React</div>
      <button onClick={trigger_create_event}>create event</button>
    </>
  );
};

export default App;
