/* eslint-disable no-unused-vars */
import "../App.css";
import React, { useEffect, useState } from "react";
import { SHOW_NAV } from "../reducer";
import { store } from "..";
import { connect } from "react-redux";

function TopNav(props) {
  const dispatch = store.dispatch;
  //////// STATE ////////

  //////// LOGOUT ////////
  const handleLogout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    window.location = props.redirectURL + "login";
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          position: "fixed",
          zIndex: 999,
          padding: "5%",
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          backgroundColor: "rgb(85, 85, 85)",
        }}
      >
        <i
          className="fa fa-bars"
          aria-hidden="true"
          style={{ fontSize: "42px", cursor: "pointer" }}
          onClick={() => dispatch({ type: SHOW_NAV })}
        ></i>
        <h2 className="my-2">REM</h2>
        <i
          onClick={() => handleLogout()}
          class="fa fa-sign-out"
          aria-hidden="true"
          style={{ fontSize: "42px" }}
        ></i>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(TopNav);
