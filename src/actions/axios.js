import axios from "axios";
import { baseURL, redirectURL } from "..";
import { LOADING } from "../reducer";
import {
  REMINDER_GET,
  REMINDER_POST,
  REMINDER_DELETE,
  SET_EDIT_TEXT,
} from "../reminder/reducer";

export async function refreshAccessToken(dispatch) {
  const body = { refresh: localStorage.getItem("refresh") };
  await axios
    .post(`${baseURL}/api/token/refresh/`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      localStorage.setItem("access", response.data.access);
    })
    .catch((err) => {
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      alert("your session has expired please log back in");
      window.location = redirectURL + "login";
    });
}

export function getReminders(dispatch) {
  dispatch({ type: LOADING });
  async function remindersGet() {
    await axios
      .get(`${baseURL}/reminder/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log("THE GET:", response.data);
        dispatch({
          type: REMINDER_GET,
          reminders: response.data,
        });
        return;
      });
  }
  remindersGet().catch((err) => {
    refreshAccessToken(dispatch).then(() => {
      remindersGet();
    });
  });
}

export function postReminder(dispatch, data) {
  dispatch({ type: LOADING });

  async function reminderPost(data) {
    await axios
      .post(`${baseURL}/reminder/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log("THE POST:", response.data);
        dispatch({
          type: REMINDER_POST,
          payload: response.data,
        });
      });
  }
  reminderPost(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      reminderPost(data).catch((err) => {
        alert("invalid POST request");
        console.log(err);
      });
    });
  });
}

export function putReminder(dispatch, data) {
  dispatch({ type: LOADING });
  async function reminderPut(data) {
    await axios
      .put(`${baseURL}/reminder/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        getReminders(dispatch);
        dispatch({ type: SET_EDIT_TEXT, editText: "" });
      });
  }
  reminderPut(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      reminderPut(data).catch((err) => {
        alert("invalid PUT request");
        console.log(err);
      });
    });
  });
}

export function deleteReminder(dispatch, reminder_id) {
  dispatch({ type: LOADING });
  async function reminderDelete(reminder_id) {
    console.log("DELETE: ", reminder_id);
    await axios
      .delete(`${baseURL}/reminder/` + reminder_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // window.location.reload();
        console.log(reminder_id);
        dispatch({
          type: REMINDER_DELETE,
          payload: reminder_id,
        });
      });
  }
  reminderDelete(reminder_id).catch((err) => {
    refreshAccessToken().then(() => {
      reminderDelete(reminder_id).catch((err) => {
        alert("invalid DELETE request");
        console.log(err);
      });
    });
  });
}
