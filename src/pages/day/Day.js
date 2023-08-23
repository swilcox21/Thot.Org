/* eslint-disable no-unused-vars */
import "../../App.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  putDaily,
  deleteDaily,
  putThot,
  postDaily,
  postDay,
} from "../../actions/axios/day";
import {
  SET_REMINDER_TOGGLE,
  SET_TEXT,
  SET_SHOW_FULL,
  SET_DROP_TRIGGER,
} from "../reminder/reducer";

import { store } from "../..";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { getDay } from "../../actions/axios/day";
import Daily from "./daily";
import { useNavigate, useParams } from "react-router-dom";

function Day(props) {
  const dispatch = store.dispatch;

  const { loading, text, reminderToggle, dropTrigger, day } =
    props.state.reminder;

  //////// STATE ///////
  const [dailys, setDailys] = useState();
  const [day_id, setDay_id] = useState();
  const [isToday, setIsToday] = useState(1);

  const { date } = useParams();

  const navigate = useNavigate();
  //////// USEREF ////////
  const inputRef = useRef(null);
  const containerDivRef = useRef(null);
  const getRef = useRef(false);

  //////// ONLOAD ////////
  useEffect(() => {
    console.log("INITIAL");
    getDay(dispatch, date);
  }, [date]);
  useEffect(() => {
    day.map((d) => {
      console.log("SECOND: ", d.dailys);
      setDailys(d.dailys);
      setDay_id(d.id);
    });
  }, [day]);
  //   useEffect(() => {
  //     const dropArr = [];
  //     console.log("adsgdsgd");
  //     day.dailys.length > 0 &&
  //       day.dailys.map((rem) => dropArr.push(day.dailys.indexOf(rem) + 1));
  //     setdroppable(dropArr);
  //   }, [day.dailys]);

  //   useEffect(() => {
  //     const _newOrder = [];
  //     droppable.map((drop, index) =>
  //       dailys
  //         .filter((reminder) => dailys.indexOf(reminder) + 1 === drop)
  //         .map((reminder) => {
  //           console.log("DROPTRIGGER");
  //           _newOrder.push({ id: reminder.id, order: index + 1 });
  //         })
  //     );
  //     setnewOrder(_newOrder);
  //   }, [dailys, droppable]);

  //   useEffect(() => {
  //     console.log("NEWORDER !dropTrigger");
  //     if (dropTrigger) {
  //       console.log("NEWORDER");
  //       dispatch({ type: SET_DROP_TRIGGER, payload: false });
  //       putDaily(dispatch, newOrder);
  //     }
  //   }, [newOrder]);

  //   function newOrderFunc() {
  //     const orderArr = [];
  //     dailys.map((rem) => {
  //       console.log(dailys.indexOf(rem));
  //       let data = { id: rem.id, order: dailys.indexOf(rem) + 1 };
  //       orderArr.push(data);
  //       return data;
  //     });
  //     setdroppable(orderArr);
  //   }

  //////// DnD KIT DRAGGABLE FUNCTION ////////
  //   function handleDragEnd(event) {
  //     console.log("Drag end called");
  //     const { active, over } = event;
  //     console.log("ACTIVE: " + active.id);
  //     console.log("OVER: " + over.id);

  //     if (active.id !== over.id) {
  //       dispatch({ type: SET_DROP_TRIGGER, payload: true });
  //       setdroppable((items) => {
  //         const activeIndex = items.indexOf(active.id);
  //         const overIndex = items.indexOf(over.id);
  //         console.log("activeINDEX: " + items.indexOf(active.id));
  //         console.log("overINDEX: " + items.indexOf(over.id));
  //         console.log(arrayMove(items, activeIndex, overIndex));
  //         return arrayMove(items, activeIndex, overIndex);
  //       });
  //     }
  //   }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
        <div
          onClick={() => {
            navigate(`/day/${dayjs().subtract(1, "day").format("YYYY-MM-DD")}`);
          }}
        >
          <i class='fa fa-chevron-left' aria-hidden='true'></i>
        </div>
        <Button
          onClick={() => {
            navigate(`/day/${dayjs().format("YYYY-MM-DD")}`);
          }}
          sx={{
            border: "1px solid #555555",
            backgroundColor: "whitesmoke",
            color: "#555555",
            marginLeft: "3%",
            marginRight: "3%",
            minHeight: 34,
            minWidth: 36,
          }}
        >
          C
        </Button>
        <div
          onClick={() => {
            navigate(`/day/${dayjs().add(1, "day").format("YYYY-MM-DD")}`);
          }}
        >
          <i class='fa fa-chevron-right' aria-hidden='true'></i>
        </div>
      </div>
      {day.length === 0 ? (
        <div
          style={{
            height: "79vh",
            textAlign: "center",
          }}
        >
          <Button
            onClick={() => postDay(dispatch, dayjs().format("dddd"), date)}
            sx={{
              border: "1px solid #555555",
              backgroundColor: "whitesmoke",
              color: "#555555",
              position: "relative",
              margin: "auto",
              top: "38%",
              width: "20%",
            }}
          >
            GET STARTED
          </Button>
        </div>
      ) : (
        <div>
          {" "}
          <div className='reminderWrapper'>
            {loading && <div className='loadBar'>I LOVE MONEY</div>}
            <br />
            <br />
            <div className='remindersContainer'>
              {dailys &&
                dailys.length > 0 &&
                dailys.map((daily, index) => (
                  <Daily
                    key={daily.id}
                    id={daily}
                    daily={daily}
                    state={props.state.reminder}
                  />
                ))}

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
                    placeholder='Add new Daily here...'
                    type='text'
                    defaultValue={""}
                    value={text}
                    onChange={(e) => {
                      dispatch({ type: SET_TEXT, text: e.target.value });
                    }}
                    onBlur={() => {
                      console.log("i love you money");
                      text !== "" && postDaily(dispatch, text, day_id);
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
                  text === "" && postDaily(dispatch, text);
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
        </div>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(Day);
// vercel
