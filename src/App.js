/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { store, redirectURL, history } from ".";
import React, { useEffect, useState } from "react";
import Router from "./router/Router";

function App() {
  //////// STATE ////////
  const state = store.getState();

  return (
    <BrowserRouter history={history}>
      <Router redirectURL={redirectURL} />
    </BrowserRouter>
  );
}

export default App;
