import React, { FC, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../firebase.config";

import EventDetail from "./Pages/EventDetail";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import UserContext from "./Contexts/UserContext";
import ThemeContext from "./Contexts/ThemeContext";
import Nav from "./Components/Nav";
import Logout from "./Pages/Logout";
import NotFound from "./Pages/NotFound";
import VersionsList from "./Pages/VersionsList";

const pages = [
  {
    path: "/",
    component: <Main />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/logout",
    component: <Logout />,
  },
  {
    path: "/event",
    component: <EventDetail />,
  },
  {
    path: "/versions",
    component: <VersionsList />,
  },
  {
    path: "/notfound",
    component: <NotFound />,
  },
];

const App: FC = () => {
  const [user] = useAuthState(auth);
  const theme = useContext(ThemeContext);
  return (
    <>
      <UserContext.Provider value={user}>
        <ThemeContext.Provider value={theme}>
          <Router>
            <Nav />
            <Switch>
              {pages.map((page) => (
                <Route
                  key={uuidv4()}
                  exact
                  path={page.path}
                  render={() => page.component}
                />
              ))}
            </Switch>
          </Router>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
