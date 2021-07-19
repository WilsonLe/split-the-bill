import React from "react";
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
];

const App = () => {
  return <div className="bg-gray-300">hello world</div>;
};

export default App;
