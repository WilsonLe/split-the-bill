import React from "react";

import { firebase } from "../../firebaseConfig";

const Menu = ({ user, setPage }) => {
  const join_event = () => {};
  const create_event = async () => {
    const create_event = firebase.functions().httpsCallable("create_event");
    try {
      const res = await create_event();
      alert(res.data);
      setPage("event");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <button onClick={join_event}>Join Event</button>
      <button onClick={create_event}>Create Event</button>
    </div>
  );
};

export default Menu;
