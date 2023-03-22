/* eslint-disable no-unused-vars */
import "../App.css";
import React, { useEffect, useState } from "react";
import { SHOW_NAV } from "../reducer";
import { redirectURL, store } from "..";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DropDown from "../components/DropDown";
import { SET_REMINDER_TOGGLE } from "../pages/reminder/reducer";

function TopNav(props) {
  const dispatch = store.dispatch;
  //////// STATE ////////

  //////// NAVIGATOR ////////
  const navigate = useNavigate();
  const { thorg } = useParams();
  thorg && console.log("FROM THE TOPNAV", thorg);
  //////// LOGOUT ////////
  const handleLogout = () => {
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    window.location = redirectURL + "login";
  };

  const dropList = [
    {
      action: () =>
        dispatch({ type: SET_REMINDER_TOGGLE, reminderToggle: true }),
      label: "add new",
    },
    {
      action: () => handleLogout(),
      icon: <i class="fa fa-sign-out" aria-hidden="true"></i>,
    },
  ];

  return (
    <div>
      {props.showNav ? (
        <>
          <div
            style={{
              width: "100%",
              padding: "25px",
              height: "90px",
              position: "fixed",
              zIndex: 999,
              display: "flex",
              justifyContent: "space-between",
              color: "white",
              backgroundColor: "rgb(85, 85, 85)",
            }}
          >
            {window.location.pathname === "/thorgs" ? (
              <>
                <i
                  className="fa fa-bell"
                  aria-hidden="true"
                  style={{ fontSize: "42px", cursor: "pointer" }}
                  onClick={() => navigate("/")}
                ></i>
                <h2 className="my-2">THORG</h2>
              </>
            ) : window.location.pathname === "/" ? (
              <>
                <i
                  className="fa fa-bars"
                  aria-hidden="true"
                  style={{ fontSize: "42px", cursor: "pointer" }}
                  onClick={() => navigate("/thorgs")}
                ></i>
                <h2 className="my-2">REM</h2>
              </>
            ) : window.location.pathname === "/thorgs/" + thorg ? (
              <>
                <i
                  className="fa fa-bars"
                  aria-hidden="true"
                  style={{ fontSize: "42px", cursor: "pointer" }}
                  onClick={() => navigate("/thorgs")}
                ></i>
                <h2 className="my-2">
                  {thorg.replace(":", "").toLocaleUpperCase()}
                </h2>
              </>
            ) : null}
            <DropDown
              //   direction={"dropleft"}
              dropIcon={
                <i
                  style={{ fontSize: "42px", cursor: "pointer" }}
                  class="fa fa-caret-square-o-down"
                  aria-hidden="true"
                ></i>
              }
              dropList={dropList}
              dropStyle={{ minWidth: "50px", padding: 0, marginRight: "15px" }}
            />
          </div>
          <div style={{ height: 90 }}></div>
        </>
      ) : (
        <div
          style={{
            width: "100%",
            padding: "25px",
            height: "90px",
            position: "relative",
            zIndex: 990,
            display: "flex",
            justifyContent: "space-between",
            color: "white",
            backgroundColor: "rgb(85, 85, 85)",
          }}
        >
          {window.location.pathname === "/thorgs" ? (
            <>
              <i
                className="fa fa-bell"
                aria-hidden="true"
                style={{ fontSize: "42px", cursor: "pointer" }}
                onClick={() => navigate("/")}
              ></i>
              <h2 className="my-2">THORG</h2>
            </>
          ) : window.location.pathname === "/" ? (
            <>
              <i
                className="fa fa-bars"
                aria-hidden="true"
                style={{ fontSize: "42px", cursor: "pointer" }}
                onClick={() => navigate("/thorgs")}
              ></i>
              <h2 className="my-2">REM</h2>
            </>
          ) : window.location.pathname === "/thorgs/" + thorg ? (
            <>
              <i
                className="fa fa-bars"
                aria-hidden="true"
                style={{ fontSize: "42px", cursor: "pointer" }}
                onClick={() => navigate("/thorgs")}
              ></i>
              <h2 className="my-2">
                {thorg.replace(":", "").toLocaleUpperCase()}
              </h2>
            </>
          ) : null}
          <DropDown
            //   direction={"dropleft"}
            dropIcon={
              <i
                style={{ fontSize: "42px", cursor: "pointer" }}
                class="fa fa-caret-square-o-down"
                aria-hidden="true"
              ></i>
            }
            dropList={dropList}
            dropStyle={{ minWidth: "50px", padding: 0, marginRight: "15px" }}
          />
        </div>
      )}
      {/* {window.location.pathname === "/thorgs/" + thorg && (
        <div
          onClick={() => navigate("/thorgs")}
          style={{
            position: "fixed",
            zIndex: 999,
            marginTop: 91,
            fontSize: "28px",
            color: "rgb(85, 85, 85)",
            marginLeft: "4%",
            padding: "10px",
            backgroundColor: "white",
          }}
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </div>
      )} */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(TopNav);
