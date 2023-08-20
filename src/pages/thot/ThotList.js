/* eslint-disable no-unused-vars */
import "../../App.css";
import React, { useEffect, useRef, useState } from "react";
import { store } from "../..";
import { connect } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { getThorgs, postThot } from "../../actions/axios";
import {
  SET_DROP_TRIGGER,
  SET_REMINDER_TOGGLE,
  SET_TEXT,
} from "../reminder/reducer";
import TextareaAutosize from "react-textarea-autosize";
import Thot from "./Thot";

function ThotList(props) {
  const dispatch = store.dispatch;
  const { text, thorgs, reminderToggle } = props.state.reminder;
  const { thorg } = useParams();
  const [thots, setThots] = useState();
  const [mindset_id, setMindset_id] = useState();

  const inputRef = useRef(null);

  useEffect(() => getThorgs(dispatch), []);
  useEffect(() => {
    console.log("THORGS", thorgs);
    console.log("THORG_", thorg);
    thorgs
      .filter((tho) => thorg === `:${tho.name}`)
      .map((thots) => {
        setThots(thots.thots);
        setMindset_id(thots.id);
      });
  }, [thorgs]);

  return (
    <>
      <div className='container-fluid' style={{ height: "200vh" }}>
        {thots && thots.map((thot) => <Thot thot={thot} />)}
        {/* NEW REMINDER */}
        {reminderToggle ? (
          <div>
            {/* <input
                className="phantomCheckbox"
                type="checkbox"
                checked={checked}
                onChange={() =>
                  dispatch({ type: SET_CHECKED, checked: checked })
                }
              /> */}
            <TextareaAutosize
              ref={inputRef}
              className='col-8 borderBottom mx-3 my-2 py-1 pl-2'
              placeholder='Add new Reminder here...'
              type='text'
              defaultValue={""}
              value={text}
              onChange={(e) => {
                dispatch({ type: SET_TEXT, text: e.target.value });
              }}
              onBlur={() => {
                text !== "" && postThot(dispatch, text, mindset_id);
                dispatch({
                  type: SET_REMINDER_TOGGLE,
                  reminderToggle: false,
                });
              }}
              autoFocus
              style={{ textAlign: "center" }}
            />
            {/* <button
                className="submitButton"
                onClick={() => {
                  console.log("its a me MARIO");
                  text === "" && postReminder(dispatch, text);
                }}
              >
                +
              </button> */}
            <div
              style={{ height: "80vh" }}
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
            style={{ height: "80vh" }}
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
export default connect(mapStateToProps)(ThotList);
// vercel
