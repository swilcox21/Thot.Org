/* eslint-disable no-unused-vars */
import "../App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { store, redirectURL, history } from "..";
import React, { useEffect, useState } from "react";
import router from "../router/Router";
import SideNav from "../router/SideNav";
import TopNav from "../router/TopNav";
import { connect } from "react-redux";
import { HIDE_NAV, SHOW_NAV } from "../reducer";

function Layout(props) {
  const dispatch = store.dispatch;
  //////// STATE ////////
  const state = store.getState();
  const [showNav, setShowNav] = useState(true);
  console.log(state);

  useEffect(() => {
    var scroll = window.scrollY;
    const handleScroll = (event) => {
      scroll > window.scrollY || scroll <= 20
        ? setShowNav(true)
        : setShowNav(false);
      scroll = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {(props.state.app.sideNav === false) &
      (showNav === true) &
      (history.location.pathname !== "/login") ? (
        <TopNav {...props} />
      ) : null}
      <div style={{ backgroundColor: "white" }}>
        <Outlet state={state} />
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(Layout);
