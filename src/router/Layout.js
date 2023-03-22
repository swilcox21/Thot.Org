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
import SideNav from "../navbar/SideNav";
import TopNav from "../navbar/TopNav";
import { connect } from "react-redux";
import { HIDE_NAV, SHOW_NAV } from "../reducer";
import Footer from "../components/Footer";

function Layout(props) {
  const dispatch = store.dispatch;
  //////// STATE ////////
  const state = store.getState();
  const [showNav, setShowNav] = useState(false);
  console.log(state);

  useEffect(() => {
    // window.scrollY = 0;
    window.scrollTo(0, 0);
    // var scroll = window.scrollY;
    // const handleScroll = (event) => {
    //   scroll > window.scrollY ? setShowNav(true) : setShowNav(false);
    //   scroll = window.scrollY;
    // };
    // window.addEventListener("scroll", handleScroll);

    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  return (
    <>
      {(props.state.app.sideNav === false) &
      (window.location.pathname !== "/login") ? (
        <TopNav {...props} showNav={showNav} />
      ) : null}
      <div style={{ backgroundColor: "white" }}>
        <Outlet state={state} />
      </div>
      <Footer />
    </>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(Layout);
