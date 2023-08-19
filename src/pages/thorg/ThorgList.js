/* eslint-disable no-unused-vars */
import "../../App.css";
import { BrowserRouter } from "react-router-dom";
import { store, redirectURL, history } from "../..";
import React, { useEffect, useRef, useState } from "react";
import { HIDE_NAV } from "../../reducer";
import {
  SET_DROP_TRIGGER,
  SET_REMINDER_TOGGLE,
  SET_TEXT,
} from "../reminder/reducer";
import { postReminder, putThorg } from "../../actions/axios";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { getThorgs } from "../../actions/axios";
import { postThorg } from "../../actions/axios";
import Thorg from "./Thorg";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { closestCorners, DndContext } from "@dnd-kit/core";

function ThorgList(props) {
  const dispatch = store.dispatch;
  const { text, checked, reminderToggle, thorgs, dropTrigger } =
    props.state.reminder;
  //////// STATE ////////
  const [droppable, setdroppable] = useState([]);
  const [newOrder, setnewOrder] = useState([]);
  // const [dropTrigger, setdropTrigger] = useState(false);

  //////// USEREFS ////////
  const wrapperDivRef = useRef(null);
  const containerDivRef = useRef(null);
  const FooterivRef = useRef(null);
  const inputRef = useRef(null);
  const getRef = useRef(false);

  //////// ONLOAD ////////
  useEffect(() => {
    console.log("INITIAL");
    getThorgs(dispatch);
    getRef.current = true;
    return () => {};
  }, []);

  useEffect(() => {
    const dropArr = [];
    console.log("adsgdsgd");
    thorgs.length > 0 &&
      thorgs.map((rem) => dropArr.push(thorgs.indexOf(rem) + 1));
    setdroppable(dropArr);
  }, [thorgs]);

  useEffect(() => {
    const _newOrder = [];
    droppable.map((drop, index) =>
      thorgs
        .filter((thorg) => thorgs.indexOf(thorg) + 1 === drop)
        .map((thorg) => {
          console.log("DROPTRIGGER");
          _newOrder.push({ id: thorg.id, order: index + 1 });
        })
    );
    setnewOrder(_newOrder);
  }, [thorgs, droppable]);

  useEffect(() => {
    console.log("NEWORDER !dropTrigger");
    if (dropTrigger) {
      console.log("NEWORDER");
      dispatch({ type: SET_DROP_TRIGGER, payload: false });
      putThorg(dispatch, newOrder);
    }
  }, [newOrder]);
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
    <div style={{}}>
      <div
        ref={containerDivRef}
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={droppable}>
            {droppable.length > 0 &&
              droppable.map((drop, index) =>
                thorgs
                  .filter((thorg) => thorg.order === drop)
                  .map((thorg) => (
                    <Thorg
                      key={thorg.id}
                      id={drop}
                      thorg={thorg}
                      state={props.state.thorg}
                      name={thorg.name}
                    />
                  ))
              )}
          </SortableContext>
        </DndContext>
        {/* {thorgs.length > 0 &&
          thorgs.map((thorg) => <Thorg name={thorg.name} />)} */}
        {reminderToggle ? (
          <div>
            <TextareaAutosize
              ref={inputRef}
              className='col-12'
              placeholder=' &nbsp; Add Thorg'
              type='text'
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
