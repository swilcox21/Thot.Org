/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../App.css";
import {
  Routes,
  Route,
  useLoaderData,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../login/Login";
import Reminders from "../reminder/ReminderList";
import PageNotFound from "./PagenotFound";
import Thorgs from "../thorg/ThorgList";
import Thots from "../thorg/ThotList";
import { connect } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TopNav from "./TopNav";
import Layout from "./Layout";
import { store } from "..";
import { getThorgs } from "../actions/axios";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Reminders />} />
      <Route path="/login" element={<Login />} />
      <Route path="/thorgs">
        <Route index element={<Thorgs />} />
        <Route path=":thorg" element={<Thots />} />
      </Route>
    </Route>
  )
);

// vercel

export default router;
