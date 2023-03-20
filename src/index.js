import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import app from "./reducer";
import reminder from "./reminder/reducer";
// import thot from "./thots/thotReducer";
import { createBrowserHistory } from "history";

export const development = false;

export const redirectURL = development
  ? "http://localhost:3001/"
  : "https://thought-org.vercel.app/";

export const baseURL = "https://thorgapi.herokuapp.com";

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: combineReducers({
    app,
    reminder,
    // thot,
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
