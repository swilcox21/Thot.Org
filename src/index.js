import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import app from "./reducer";
import reminder from "./pages/reminder/reducer";
// import thot from "./thots/thotReducer";

export const development = false;
export const redirectURL = development
  ? "http://localhost:3000/"
  : "https://thotorg.app/";
export const baseURL = "https://thorgapi.herokuapp.com";
// export const baseURL = "https://thot-dot-org-e18f495798dc.herokuapp.com";
export const history = createBrowserHistory();

//////// STORE ////////
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
