import React from "react";
import { firebase } from "./firebaseConfig";

import Panel from "./Components/Panel";

const App = () => {
  const trigger_create_event = async () => {
    const create_event = firebase.functions().httpsCallable("create_event");
    const res = await create_event({ hello: "world" });
    alert(res.data);
  };
  return (
    <>
      <Panel>
        <h1>Split the bill</h1>
        <button onClick={trigger_create_event}>create event</button>
      </Panel>
    </>
  );
};

export default App;
