import axios from "axios";
import { baseURL, redirectURL } from "../..";
import { LOADING } from "../../reducer";
import { DAY_GET, DAY_POST, THORG_POST } from "../../pages/reminder/reducer";
import { refreshAccessToken } from "../axios";
import {
  DAILY_GET,
  DAILY_POST,
  SET_DROP_TRIGGER,
  SET_EDIT_TEXT,
} from "../../pages/reminder/reducer";

export function getDay(dispatch, date) {
  dispatch({ type: LOADING });
  async function dayGet() {
    await axios
      .get(`${baseURL}/day/?date=${date}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log("THE GET:", response.data);
        dispatch({
          type: DAY_GET,
          day: response.data,
        });
        return;
      });
  }
  dayGet().catch((err) => {
    refreshAccessToken(dispatch).then(() => {
      dayGet();
    });
  });
}

export function postDay(dispatch, name) {
  dispatch({ type: LOADING });
  const data = [{ name: name }];
  async function dayPost(data) {
    await axios
      .post(`${baseURL}/day/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log("THE POST:", response.data);
        dispatch({
          type: DAY_POST,
          payload: response.data,
        });
      });
  }
  dayPost(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      dayPost(data).catch((err) => {
        alert("invalid POST request");
        console.log(err);
      });
    });
  });
}

export function getDailys(dispatch) {
  dispatch({ type: LOADING });
  async function dailysGet() {
    await axios
      .get(`${baseURL}/daily/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log("THE GET:", response.data);
        dispatch({
          type: DAILY_GET,
          dailys: response.data,
        });
        return;
      });
  }
  dailysGet().catch((err) => {
    refreshAccessToken(dispatch).then(() => {
      dailysGet();
    });
  });
}

export function postDaily(dispatch, text, day_id) {
  dispatch({ type: LOADING });
  const data = [{ text: text, day: { id: day_id } }];
  async function dailyPost(data) {
    await axios
      .post(`${baseURL}/daily/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log("THE POST:", response.data);
        dispatch({
          type: THORG_POST,
          payload: response.data,
        });
      });
  }
  dailyPost(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      dailyPost(data).catch((err) => {
        alert("invalid POST request");
        console.log(err);
      });
    });
  });
}

export function putDaily(dispatch, data) {
  dispatch({ type: LOADING });
  async function dailyPut(data) {
    await axios
      .put(`${baseURL}/daily/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        getDailys(dispatch);
        dispatch({ type: SET_EDIT_TEXT, editText: "" });
      });
  }
  dailyPut(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      dailyPut(data).catch((err) => {
        alert("invalid PUT request");
        console.log(err);
      });
    });
  });
}

export function deleteDaily(dispatch, daily_id) {
  dispatch({ type: LOADING });
  async function dailyDelete(daily_id) {
    console.log("DELETE: ", daily_id);
    await axios
      .delete(`${baseURL}/daily/` + daily_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // window.location.reload();
        console.log(daily_id);
        getDailys(dispatch);
        // dispatch({
        //   type: DAILY_DELETE,
        //   payload: daily_id,
        // });
      })
      .then((response) => {
        dispatch({ type: SET_DROP_TRIGGER, payload: true });
      });
  }
  dailyDelete(daily_id).catch((err) => {
    refreshAccessToken().then(() => {
      dailyDelete(daily_id).catch((err) => {
        alert("invalid DELETE request");
        console.log(err);
      });
    });
  });
}
