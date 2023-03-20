/* eslint-disable no-unused-vars */
import "../App.css";
import { BrowserRouter } from "react-router-dom";
import { store, redirectURL, history } from "..";
import React, { useEffect, useRef, useState } from "react";
import { HIDE_NAV } from "../reducer";
import { SET_REMINDER_TOGGLE, SET_TEXT } from "../reminder/reducer";
import { postReminder } from "../actions/axios";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { getThorgs } from "../actions/axios";
import { postThorg } from "../actions/axios";

function SideNav(props) {
  const dispatch = store.dispatch;
  const { text, checked, reminderToggle, thorgs } = props.state.reminder;
  //////// STATE ////////

  //////// USEREF ////////
  const inputRef = useRef(null);

  //////// ONLOAD ////////
  useEffect(() => {
    getThorgs(dispatch);
  }, []);

  return (
    <>
      <div
        style={{
          borderBottom: "1px solid gray",
          //   position: "fixed",
          display: "flex",
          zIndex: 999,
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={() => dispatch({ type: HIDE_NAV })}
          style={{
            fontSize: "36px",
            color: "rgb(85, 85, 85)",
            margin: "5%",
            zIndex: 999,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          X
        </div>
        <div
          onClick={() =>
            dispatch({ type: SET_REMINDER_TOGGLE, reminderToggle: true })
          }
          style={{
            fontSize: "56px",
            color: "rgb(85, 85, 85)",
            marginRight: "4%",
            zIndex: 999,
            cursor: "pointer",
          }}
        >
          +
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          zIndex: 998,
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          textAlign: "center",
          //   paddingTop: "100px",
        }}
      >
        {thorgs.length > 0 &&
          thorgs.map((thorg) => (
            <div
              className="col-12"
              style={{
                padding: "35px",
                margin: "auto",
                fontSize: "42px ",
                color: "rgb(85, 85, 85)",
                backgroundColor: "whitesmoke",
                borderBottom: "1px solid gray",
                // marginBottom: "10px",
                // borderRadius: "5px",
              }}
            >
              {thorg.name}
            </div>
          ))}
        {reminderToggle ? (
          <div>
            <TextareaAutosize
              ref={inputRef}
              className="col-12"
              placeholder=" &nbsp; Add Thorg"
              type="text"
              syle={{ zIndex: 999 }}
              value={text}
              onChange={(e) => {
                dispatch({ type: SET_TEXT, text: e.target.value });
              }}
              onBlur={() => {
                console.log("i love you chritine");
                text !== "" && postThorg(dispatch, text);
                dispatch({
                  type: SET_REMINDER_TOGGLE,
                  reminderToggle: false,
                });
              }}
              style={{
                textAlign: "center",
                padding: "35px",
                margin: "auto",
                fontSize: "42px ",
                color: "rgb(85, 85, 85)",
                backgroundColor: "whitesmoke",
                borderBottom: "1px solid gray",
              }}
              autoFocus
            />
            <div
              style={{ height: "100vh" }}
              onClick={() =>
                dispatch({
                  type: SET_REMINDER_TOGGLE,
                  reminderToggle: false,
                })
              }
            ></div>
          </div>
        ) : (
          <div
            onClick={() =>
              dispatch({
                type: SET_REMINDER_TOGGLE,
                reminderToggle: true,
              })
            }
            style={{ height: "100vh" }}
          ></div>
        )}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(SideNav);
