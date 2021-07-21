import React, { FC, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase } from "../firebase.config";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Event from "./Pages/Event";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import UserContext from "./Contexts/UserContext";
import ThemeContext from "./Contexts/ThemeContext";
import Nav from "./Components/Nav";

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
          <Nav />
          <Router>
            <Switch>
              {pages.map((page) => (
                <Route exact path={page.path}>
                  {page.component}
                </Route>
              ))}
            </Switch>
          </Router>
        </ThemeContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
