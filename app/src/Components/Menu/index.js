import React from "react";

import { firebase } from "../../firebase.config";

const Menu = ({ user, setEvent }) => {
  const trigger_create_event = async () => {
    const create_event = firebase.functions().httpsCallable("create_event");
    try {
      const res = await create_event({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Menu</h1>
      <button onClick={trigger_create_event}>Create Event</button>
    </div>
  );
};

export default Menu;
