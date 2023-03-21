/* eslint-disable no-unused-vars */
import "../../App.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { putReminder, deleteReminder, putThot } from "../../actions/axios";
import { SET_EDIT_TEXT, SET_SHOW_FULL } from "../reminder/reducer";
import { store } from "../..";
import BasicModal from "../../components/Modal";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function Thot(props) {
  const dispatch = store.dispatch;
  //////// STATE ///////
  const [editThot, setEditThot] = useState("");
  const [showFull, setShowFull] = useState(false);

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
    setEditThot(value);
  }, []);
  //////// STATE ///////

  return (
    <>
      <div
        style={{
          width: "100%",
          padding: "15px",
          margin: "auto",
        }}
      >
        <CodeMirror
          theme="light"
          value={props.thot.text}
          height="auto"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          onFocus={() => setShowFull(true)}
          onBlur={() => {
            editThot.length > 0 && putThot(dispatch, props.thot.id, editThot);
            setShowFull(false);
          }}
        />
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(Thot);
// vercel
