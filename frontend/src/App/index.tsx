import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Event from "./Pages/Event";
import Login from "./Pages/Login";
import Main from "./Pages/Main";

const pages = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/event",
    component: Event,
  },
];

const App: FC = () => {
  return (
    <>
      <Router>
        <Switch>
          {pages.map((page) => (
            <Route exact path={page.path}>
              {page.component}
            </Route>
          ))}
        </Switch>
      </Router>
    </>
  );
};

export default App;
