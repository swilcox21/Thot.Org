/* eslint-disable no-unused-vars */
import "../../App.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useRef, useState } from "react";
import { putDaily, deleteDaily } from "../../actions/axios/day";
import { SET_EDIT_TEXT, SET_SHOW_FULL } from "./reducer";
import { store } from "../..";
import BasicModal from "../../components/Modal";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { TextareaAutosize } from "@mui/material";

function Daily(props) {
  const dispatch = store.dispatch;
  //////// STATE ///////
  const [editText, setEditText] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [showFullHold, setShowFullHold] = useState(true);

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
      <div className='reminder' ref={setNodeRef} style={style}>
        {/* DROP DOWN */}
        <div className='dropdown dropleft'>
          <BasicModal
            showButton={
              showFullHold ? (
                <i className='fa fa-chevron-down' aria-hidden='true'></i>
              ) : (
                <i className='fa fa-chevron-right' aria-hidden='true'></i>
              )
            }
            header={null}
            excerpt={`Are you sure you want to delete daily #${props.id}`}
            action={deleteDaily}
            dblClick={true}
            click={() => {
              setShowFullHold(!showFullHold);
            }}
            actionButton={"DELETE"}
            dispatch={dispatch}
            id={props.daily.id}
            styles={{ minWidth: 30, fontSize: 18, color: "gray" }}
          />
        </div>

        {/* TEXT AREA */}
        <TextareaAutosize
          className='col-8 borderBottom mx-3 '
          type='text'
          defaultValue={props.daily.text}
          onChange={(e) => {
            setEditText(e.target.value);
          }}
          onFocus={() => setShowFull(true)}
          onBlur={() => {
            editText.length > 0 &&
              putDaily(dispatch, [{ id: props.daily.id, text: editText }]);
            setShowFull(false);
            setEditText("");
          }}
          style={
            showFull | showFullHold
              ? {
                  textAlign: "center",
                  padding: 0,
                  paddingBottom: 5,
                  marginBottom: 5,
                }
              : {
                  textAlign: "center",
                  overflow: "hidden",
                  maxHeight: "29px",
                }
          }
        />

        {/* GRABBALE DROPPABLE */}
        <div
          {...attributes}
          {...listeners}
          onDoubleClick={() => deleteDaily(dispatch, props.daily.id)}
          style={{
            // border: "1px solid gray",
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
        ></div>

        <br />
        <br />
      </div>
    </>
  );
}

export default Daily;
// vercel

///////// DROP DOWN CODE ///////
{
  /* <div
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
                  setShowFullHold(!showFullHold);
                }}
                href="#"
              >
                {showFull ? "shrink" : "grow"}
              </div>
            </div>
          </div> */
}
