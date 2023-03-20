/* eslint-disable no-unused-vars */
import "../App.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { putReminder, deleteReminder } from "../actions/axios";
import { SET_EDIT_TEXT } from "./reducer";
import { store } from "..";
import BasicModal from "../components/Modal";

function Reminder(props) {
  const { editText, showFull } = props.state;

  const dispatch = store.dispatch;

  const [data, setdata] = useState([{ text: "" }]);
  const [modal, setmodal] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      {modal && (
        <div
          className="container-fluid"
          style={{
            float: "top",
            margin: "auto",
            zIndex: 900,
            height: "100vh",
            backgroundColor: "rgba(137, 137, 137, 0.337)",
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  D
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  className="submitButton"
                  onClick={() => {
                    deleteReminder(dispatch, props.reminder.id);
                  }}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="reminder" ref={setNodeRef} style={style}>
        <div
          {...attributes}
          {...listeners}
          style={{
            border: "1px solid lightgray",
            borderRadius: "5px",
            color: "lightgray",
            cursor: "grab",
            padding: "5px",
          }}
        >
          : : :
        </div>
        <TextareaAutosize
          className={
            showFull
              ? "col-9 borderBottom reminderTextAreaShow mx-3 py-1 pl-2"
              : "col-9 borderBottom reminderTextArea mx-3 py-1 pl-2"
          }
          type="text"
          defaultValue={props.reminder.text}
          onChange={(e) => {
            dispatch({
              type: SET_EDIT_TEXT,
              editText: e.target.value,
            });
          }}
          onBlur={() => {
            editText !== "" &&
              putReminder(dispatch, [
                { id: props.reminder.id, text: editText },
              ]);
            dispatch({ type: SET_EDIT_TEXT, editText: "" });
          }}
        />
        <div className="dropdown dropleft">
          <button
            className="btn btn-secondary dropdown-toggle dropleft"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
          <div
            className="dropdown-menu dropleft"
            aria-labelledby="dropdownMenuButton"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              href="#"
            >
              <div className="dropdown-item" href="#">
                Action
              </div>
              <div className="dropdown-item" href="#">
                Another action
              </div>
              <BasicModal
                showButton={"X"}
                header={null}
                excerpt={`Are you sure you want to delete reminder #${props.reminder.id}`}
                action={deleteReminder}
                actionButton={"DELETE"}
                dispatch={dispatch}
                id={props.reminder.id}
              />
              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                onClick={() => deleteReminder(dispatch, props.reminder.id)}
              >
                X
              </button>
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
