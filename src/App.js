/* eslint-disable no-unused-vars */
import "./App.css";
import { RouterProvider } from "react-router-dom";
import React from "react";
import router from "./router/Router";

function App(props) {
  return <RouterProvider router={router} />;
}

export default App;
