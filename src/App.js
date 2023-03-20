/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { store, redirectURL, history } from ".";
import React, { useEffect, useState } from "react";
import Router from "./router/Router";
import SideNav from "./router/SideNav";
import TopNav from "./router/TopNav";
import { connect } from "react-redux";
import { HIDE_NAV, SHOW_NAV } from "./reducer";

function App(props) {
  const dispatch = store.dispatch;
  //////// STATE ////////
  const state = store.getState();
  const [showNav, setShowNav] = useState(true);

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
    <BrowserRouter>
      {(props.state.app.sideNav === false) &
      (showNav === true) &
      (history.location.pathname !== "/login") ? (
        <TopNav {...props} />
      ) : null}
      {props.state.app.sideNav && <SideNav {...props} />}
      <Router {...props} />
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(App);
