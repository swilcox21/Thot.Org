/* eslint-disable no-unused-vars */
import "../../App.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { putReminder, deleteReminder } from "../../actions/axios";
import { SET_EDIT_TEXT, SET_SHOW_FULL } from "./reducer";
import { store } from "../..";
import BasicModal from "../../components/Modal";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function Reminder(props) {
  const dispatch = store.dispatch;
  //////// STATE ///////
  const [editText, setEditText] = useState("");
  const [showFull, setShowFull] = useState(false);

  const [data, setdata] = useState([{ text: "" }]);
  const [modal, setmodal] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
    setEditText(value);
  }, []);
  return (
    <>
      <div className="reminder" ref={setNodeRef} style={style}>
        <div
          {...attributes}
          {...listeners}
          style={{
            border: "1px solid gray",
            backgroundColor: "white",
            borderRadius: "5px",
            position: "relative",
            zIndex: 998,
            color: "gray",
            cursor: "grab",
            padding: "5px",
            paddingLeft: "7px",
            paddingRight: "7px",
          }}
        >
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
          &nbsp;
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>&nbsp;
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
        <TextareaAutosize
          className={
            showFull
              ? "col-8 borderBottom reminderTextAreaShow mx-3 py-1 pl-2"
              : "col-8 borderBottom reminderTextArea mx-3 py-1 pl-2"
          }
          type="text"
          defaultValue={props.reminder.text}
          onChange={(e) => {
            setEditText(e.target.value);
          }}
          onBlur={() => {
            editText.length > 0 &&
              putReminder(dispatch, [
                { id: props.reminder.id, text: editText },
              ]);
            setEditText("");
          }}
          style={{ textAlign: "center" }}
        />
        {/* DROP DOWN */}
        <div className="dropdown dropleft">
          <div
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{
              cursor: "pointer",
              color: "gray",
              border: "1px solid gray",
              borderRadius: "5px",
              padding: 5,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            {/* <i className="fa fa-angle-down" aria-hidden="true"></i> */}
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              href="#"
            >
              <div
                className="dropdown-item addnewButton"
                onClick={() => {
                  setShowFull(!showFull);
                }}
                href="#"
              >
                {showFull ? "shrink" : "grow"}
              </div>
              <BasicModal
                showButton={"X"}
                header={null}
                excerpt={`Are you sure you want to delete reminder #${props.id}`}
                action={deleteReminder}
                actionButton={"DELETE"}
                dispatch={dispatch}
                id={props.reminder.id}
              />
              {/* <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                onClick={() => deleteReminder(dispatch, props.reminder.id)}
              >
                X
              </button> */}
            </div>
          </div>
        </div>

        <br />
        <br />
      </div>
    </>
  );
}

export default Reminder;
// vercel
