import React, { FC, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { firebase } from "../firebase.config";

import Event from "./Pages/Event";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import UserContext from "./Contexts/UserContext";
import ThemeContext from "./Contexts/ThemeContext";
import Nav from "./Components/Nav";
import Logout from "./Pages/Logout";
import Popup from "./Components/Popup";

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
    component: <Event />,
  },
];

const App: FC = () => {
  const [user] = useAuthState(firebase.auth());
  const [theme, setTheme] = useState("dark");

  return (
    <>
      <UserContext.Provider value={user}>
        <ThemeContext.Provider value={theme}>
          <Router>
            <Nav />
            {/* <Popup /> */}
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
