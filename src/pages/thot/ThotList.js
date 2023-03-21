/* eslint-disable no-unused-vars */
import "../../App.css";
import React, { useEffect, useRef, useState } from "react";
import { store } from "../..";
import { connect } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { getThorgs } from "../../actions/axios";
import Thot from "./Thot";

function ThotList(props) {
  const dispatch = store.dispatch;
  const { thorgs } = props.state.reminder;
  const { thorg } = useParams();
  const [thots, setThots] = useState();

  useEffect(() => getThorgs(dispatch), []);
  useEffect(() => {
    console.log("THORGS", thorgs);
    console.log("THORG_", thorg);
    thorgs
      .filter((tho) => thorg === `:${tho.name}`)
      .map((thots) => setThots(thots.thots));
  }, [thorgs]);

  return (
    <>
      <div
        className="container-fluid"
        style={{ paddingTop: 150, height: "200vh" }}
      >
        {thots && thots.map((thot) => <Thot thot={thot} />)}
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
