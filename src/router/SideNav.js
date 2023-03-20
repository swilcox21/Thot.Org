/* eslint-disable no-unused-vars */
import "../App.css";
import { BrowserRouter } from "react-router-dom";
import { store, redirectURL, history } from "..";
import React, { useEffect, useState } from "react";
import { HIDE_NAV } from "../reducer";

function SideNav(props) {
  //////// STATE ////////
  const dispatch = store.dispatch;
  return (
    <>
      <div
        onClick={() => dispatch({ type: HIDE_NAV })}
        style={{
          fontSize: "36px",
          color: "rgb(85, 85, 85)",
          position: "fixed",
          margin: "5%",
          zIndex: 999,
        }}
      >
        X
      </div>
      <div
        style={{
          position: "fixed",
          zIndex: 998,
          width: "100%",
          height: "100vh",
          backgroundColor: "whitesmoke",
          textAlign: "center",
          paddingTop: "100px",
        }}
      >
        HOWDY
      </div>
    </>
  );
}

export default SideNav;
