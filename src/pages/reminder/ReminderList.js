/* eslint-disable no-unused-vars */
// import PropTypes from "prop-types";
import "../../App.css";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { connect } from "react-redux";
import { getReminders, postReminder, putReminder } from "../../actions/axios";
import {
  SET_TEXT,
  SET_CHECKED,
  SET_SHOW_FULL,
  SET_REMINDER_TOGGLE,
  SET_DROP_TRIGGER,
  SET_WRAP_POSITION,
  SET_CONT_POSITION,
  SET_FOOT_POSITION,
  DASHBOARD,
} from "./reducer";
import { store } from "../..";
import { Link } from "react-router-dom";
import Reminder from "./Reminder";
import BasicModal from "../../components/Modal";
// REMINDERS

function ReminderList(props) {
  const dispatch = store.dispatch;
  const {
    loading,
    dashboard,
    text,
    checked,
    reminderToggle,
    dropTrigger,
    reminders,
    showDash,
    showFull,
    wrapperSize,
    contSize,
    footSize,
  } = props.state.reminder;

  //////// LOCAL STATE ////////
  const [droppable, setdroppable] = useState([]);
  const [newOrder, setnewOrder] = useState([]);
  // const [dropTrigger, setdropTrigger] = useState(false);

  //////// USEREFS ////////
  const wrapperDivRef = useRef(null);
  const containerDivRef = useRef(null);
  const FooterivRef = useRef(null);
  const inputRef = useRef(null);
  const getRef = useRef(false);

  const appHeight = Math.round(footSize - contSize);
  const [padSize, setPadSize] = useState(appHeight);

  //////// ONLOAD ////////
  useEffect(() => {
    console.log("INITIAL");
    getReminders(dispatch);
    getRef.current = true;
    return () => {};
  }, []);

  useEffect(() => {
    const dropArr = [];
    console.log("adsgdsgd");
    reminders.length > 0 &&
      reminders.map((rem) => dropArr.push(reminders.indexOf(rem) + 1));
    setdroppable(dropArr);
  }, [reminders]);

  useEffect(() => {
    const _newOrder = [];
    droppable.map((drop, index) =>
      reminders
        .filter((reminder) => reminders.indexOf(reminder) + 1 === drop)
        .map((reminder) => {
          console.log("DROPTRIGGER");
          _newOrder.push({ id: reminder.id, order: index + 1 });
        })
    );
    setnewOrder(_newOrder);
  }, [reminders, droppable]);

  useEffect(() => {
    console.log("NEWORDER !dropTrigger");
    if (dropTrigger) {
      console.log("NEWORDER");
      dispatch({ type: SET_DROP_TRIGGER, payload: false });
      putReminder(dispatch, newOrder);
    }
  }, [newOrder]);

  function newOrderFunc() {
    const orderArr = [];
    reminders.map((rem) => {
      console.log(reminders.indexOf(rem));
      let data = { id: rem.id, order: reminders.indexOf(rem) + 1 };
      orderArr.push(data);
      return data;
    });
    setdroppable(orderArr);
  }

  //////// DnD KIT DRAGGABLE FUNCTION ////////
  function handleDragEnd(event) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER: " + over.id);

    if (active.id !== over.id) {
      dispatch({ type: SET_DROP_TRIGGER, payload: true });
      // setTimeout(() => {
      setdroppable((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log("activeINDEX: " + items.indexOf(active.id));
        console.log("overINDEX: " + items.indexOf(over.id));
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
      // }, 1000);
    }
  }

  return (
    <div className="reminderWrapper">
      {loading && <div className="loadBar">I LOVE CHRISTINE</div>}
      <br />
      <br />
      <div ref={containerDivRef} className="remindersContainer">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={droppable}>
            {droppable.length > 0 &&
              droppable.map((drop, index) =>
                reminders
                  .filter((reminder) => reminder.order === drop)
                  .map((reminder) => (
                    <Reminder
                      key={reminder.id}
                      id={drop}
                      reminder={reminder}
                      state={props.state.reminder}
                    />
                  ))
              )}
          </SortableContext>
        </DndContext>
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
              className="col-8 borderBottom mx-3 my-2 py-1 pl-2"
              placeholder="Add new Reminder here..."
              type="text"
              defaultValue={""}
              value={text}
              onChange={(e) => {
                dispatch({ type: SET_TEXT, text: e.target.value });
              }}
              onBlur={() => {
                console.log("i love you chritine");
                text !== "" && postReminder(dispatch, text);
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
    </div>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(ReminderList);
// vercel
// Reminders.propTypes = {
//   reminder: PropTypes.object,
// };
