/* eslint-disable no-unused-vars */
import "../../App.css";
import { BrowserRouter } from "react-router-dom";
import { store, redirectURL, history } from "../..";
import React, { useEffect, useRef, useState } from "react";
import { HIDE_NAV } from "../../reducer";
import { SET_REMINDER_TOGGLE, SET_TEXT } from "../reminder/reducer";
import { postReminder } from "../../actions/axios";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { getThorgs } from "../../actions/axios";
import { postThorg } from "../../actions/axios";
import Thorg from "./Thorg";

function ThorgList(props) {
  const dispatch = store.dispatch;
  const { text, checked, reminderToggle, thorgs } = props.state.reminder;
  //////// STATE ////////

  //////// USEREF ////////
  const inputRef = useRef(null);

  //////// ONLOAD ////////
  useEffect(() => {
    getThorgs(dispatch);
    // FUNC TO SET ME TO TOP OF PAGE ON LOAD
  }, []);

  return (
    <div style={{}}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          textAlign: "center",
          paddingTop: 90,
        }}
      >
        {thorgs.length > 0 &&
          thorgs.map((thorg) => <Thorg name={thorg.name} />)}
        {reminderToggle ? (
          <div>
            <TextareaAutosize
              ref={inputRef}
              className="col-12"
              placeholder=" &nbsp; Add Thorg"
              type="text"
              syle={{}}
              value={text}
              autoFocus
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
    </div>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(ThorgList);
