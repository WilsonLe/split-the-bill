import React, { useState } from "react";
import { firebase } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

import Auth from "./Components/Auth";
import Menu from "./Components/Menu";
import Event from "./Components/Event";
import NotFound from "./Components/NotFound";

const App = () => {
  const [page, setPage] = useState("auth");
  const [user] = useAuthState(firebase.auth());

  if (page === "auth")
    return (
      <>
        <h1>Sign in to start using the app!</h1>
        <Auth user={user} setPage={setPage} />
      </>
    );
  else if (page === "actions")
    return <> {user ? <Menu user={user} setPage={setPage} /> : <NotFound />}</>;
  else if (page === "event") return <> {user ? <Event /> : <NotFound />}</>;
  else return NotFound;
};

export default App;
