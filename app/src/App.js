import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { firebase } from "./firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

import Auth from "./Components/Auth";
import Menu from "./Components/Menu";
import Event from "./Components/Event";
import NotFound from "./Components/NotFound";

const App = () => {
  const [user] = useAuthState(firebase.auth());
  const [event, setEvent] = useState({});
  const paths = [
    {
      path: "/",
      component: <Menu user={user} setEvent={setEvent} />,
    },
    {
      path: "/join",
      component: null,
    },
    {
      path: "/event",
      component: <Event event={event} />,
    },
    {
      path: "/auth",
      component: <Auth user={user} />,
    },
    {
      path: "*", // Must be at last, for catching every path
      component: <NotFound />,
    },
  ];
  return (
    <BrowserRouter>
      <Switch>
        {paths.map((path) => (
          <Route key={uuidv4()} path={path.path}>
            {path.component}
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
