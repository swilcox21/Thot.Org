/* eslint-disable no-unused-vars */
import "../../App.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { store, redirectURL, history } from "../..";
import React, { useEffect, useRef, useState } from "react";
import { HIDE_NAV } from "../../reducer";
import { SET_REMINDER_TOGGLE, SET_TEXT } from "../reminder/reducer";
import { postReminder } from "../../actions/axios";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { getThorgs } from "../../actions/axios";
import { postThorg } from "../../actions/axios";

function Thorg(props) {
  const dispatch = store.dispatch;
  const { text, checked, reminderToggle } = props.state.reminder;
  //////// STATE ////////

  //////// USEREF ////////
  const inputRef = useRef(null);

  //////// NAVIGATOR ////////
  const navigate = useNavigate();

  //////// ONLOAD ////////
  useEffect(() => {
    getThorgs(dispatch);
  }, []);

  return (
    <>
      <div
        className="col-12"
        onClick={() => navigate(`:${props.name}`)}
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
        {props.name}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(Thorg);
