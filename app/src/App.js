import React, { useState } from "react";
import { firebase } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

import Auth from "./Components/Auth";
import Menu from "./Components/Menu";
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
    return <> {user ? <Menu user={user} /> : null}</>;
  else return NotFound;
};

export default App;
