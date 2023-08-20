/* eslint-disable no-unused-vars */
import "../../App.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { store, redirectURL, history } from "../..";
import React, { useEffect, useRef, useState } from "react";
import { HIDE_NAV } from "../../reducer";
import { SET_REMINDER_TOGGLE, SET_TEXT } from "../reminder/reducer";
import { postReminder } from "../../actions/axios";
import TextareaAutosize from "react-textarea-autosize";
import { connect } from "react-redux";
import { getThorgs, deleteThorg, putThorg } from "../../actions/axios";
import { postThorg } from "../../actions/axios";
import BasicModal from "../../components/Modal";

function Thorg(props) {
  const dispatch = store.dispatch;
  const { text, checked, reminderToggle } = props.state.reminder;
  //////// STATE ////////
  const [hiorbye, setHiorbye] = useState("Hii");
  const [editText, setEditText] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [showFullHold, setShowFullHold] = useState(false);

  const [data, setdata] = useState([{ text: "" }]);
  const [modal, setmodal] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.thorg.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
    setEditText(value);
  }, []);
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
      <div ref={setNodeRef} style={style} className='mindset'>
        <div
          style={{
            cursor: "pointer",
            minWidth: "20%",
            height: 130,
            lineHeight: "130px",
            position: "relative",
            zIndex: 9,
            fontSize: 36,
            color: "#555555",
          }}
        >
          <BasicModal
            // showButton={
            //   showFullHold ? (
            //     <i className='fa fa-chevron-down' aria-hidden='true'></i>
            //   ) : (
            //     <i className='fa fa-chevron-right' aria-hidden='true'></i>
            //   )
            // }
            header={null}
            excerpt={`Are you sure you want to delete reminder #${props.thorg.id}`}
            action={deleteThorg}
            dblClick={true}
            click={() => {
              setShowFull(!showFullHold);
            }}
            actionButton={"DELETE"}
            dispatch={dispatch}
            id={props.thorg.id}
            styles={{ width: "100%", height: 130, fontSize: 36 }}
          />
        </div>
        <div
          className='col-12'
          onClick={() => navigate(`:${props.name}`)}
          style={{
            paddingTop: "35px",
            paddingBottom: "35px",
            margin: "auto",
            maxWidth: "60%",
            fontSize: "42px ",
            color: "rgb(85, 85, 85)",

            // marginBottom: "10px",
            // borderRadius: "5px",
          }}
        >
          {props.name}
        </div>
        <div
          {...attributes}
          {...listeners}
          // onClick={() => }
          style={{
            cursor: "grab",
            minWidth: "20%",
            height: 130,
            position: "relative",
            zIndex: 9,
            lineHeight: "130px",
            fontSize: 36,
            color: "#555555",
          }}
        ></div>
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
