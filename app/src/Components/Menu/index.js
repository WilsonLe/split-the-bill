import React from "react";

import { firebase } from "../../firebase.config";

const Menu = ({ user, setPage }) => {
  const join_event = () => {};
  const create_event = async () => {
    const create_event = firebase.functions().httpsCallable("create_event");
    try {
      const res = await create_event({
        name: user.displayName,
        email: user.email,
      });
      alert(res.data);
      setPage("event");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <button onClick={create_event}>Create Event</button>
    </div>
  );
};

export default Menu;
