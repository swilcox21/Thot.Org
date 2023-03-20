/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import Reminder from "../reminder/ReminderList";
import PageNotFound from "./PagenotFound";

function Router(props) {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound {...props} />} />
      <Route path="/" element={<Reminder {...props} />} />
      <Route path="/login" element={<Login {...props} />} />
    </Routes>
  );
}

export default Router;
// vercel
