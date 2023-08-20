import axios from "axios";
import { baseURL, redirectURL } from "..";
import { LOADING } from "../reducer";
import { THORG_POST, THOT_POST } from "../pages/reminder/reducer";
import { THORG_GET, THOT_GET } from "../pages/reminder/reducer";
import {
  REMINDER_GET,
  REMINDER_POST,
  REMINDER_DELETE,
  SET_EDIT_TEXT,
  SET_DROP_TRIGGER,
} from "../pages/reminder/reducer";

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

export function postReminder(dispatch, text) {
  dispatch({ type: LOADING });
  const data = [{ text: text }];
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
        getReminders(dispatch);
        // dispatch({
        //   type: REMINDER_DELETE,
        //   payload: reminder_id,
        // });
      })
      .then((response) => {
        dispatch({ type: SET_DROP_TRIGGER, payload: true });
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

export function getThorgs(dispatch) {
  dispatch({ type: LOADING });
  async function thorgsGet() {
    await axios
      .get(`${baseURL}/mindset/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        console.log("THE GET:", response.data);
        dispatch({
          type: THORG_GET,
          thorgs: response.data,
        });
        return;
      });
  }
  thorgsGet().catch((err) => {
    refreshAccessToken(dispatch).then(() => {
      thorgsGet();
    });
  });
}

export function postThorg(dispatch, name) {
  dispatch({ type: LOADING });
  const data = [{ name: name }];
  async function thorgPost(data) {
    await axios
      .post(`${baseURL}/mindset/`, data, {
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
  thorgPost(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      thorgPost(data).catch((err) => {
        alert("invalid POST request");
        console.log(err);
      });
    });
  });
}

export function putThorg(dispatch, data) {
  dispatch({ type: LOADING });
  async function thorgPut(data) {
    await axios
      .put(`${baseURL}/mindset/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        getThorgs(dispatch);
        dispatch({ type: SET_EDIT_TEXT, editText: "" });
      });
  }
  thorgPut(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      thorgPut(data).catch((err) => {
        alert("invalid PUT request");
        console.log(err);
      });
    });
  });
}

export function deleteThorg(dispatch, thorg_id) {
  dispatch({ type: LOADING });
  async function thorgDelete(thorg_id) {
    console.log("DELETE: ", thorg_id);
    await axios
      .delete(`${baseURL}/mindset/` + thorg_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // window.location.reload();
        console.log(thorg_id);
        getThorgs(dispatch);
        // dispatch({
        //   type: THORG_DELETE,
        //   payload: thorg_id,
        // });
      })
      .then((response) => {
        dispatch({ type: SET_DROP_TRIGGER, payload: true });
      });
  }
  thorgDelete(thorg_id).catch((err) => {
    refreshAccessToken().then(() => {
      thorgDelete(thorg_id).catch((err) => {
        alert("invalid DELETE request");
        console.log(err);
      });
    });
  });
}

export function postThot(dispatch, text, mindset_id) {
  dispatch({ type: LOADING });
  const data = [{ text: text, mindset: { id: mindset_id } }];
  async function thotPost(data) {
    await axios
      .post(`${baseURL}/thot/`, data, {
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
  thotPost(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      thotPost(data).catch((err) => {
        alert("invalid POST request");
        console.log(err);
      });
    });
  });
}

export function putThot(dispatch, thot_id, text) {
  dispatch({ type: LOADING });
  const data = [
    {
      id: thot_id,
      text: text,
    },
  ];
  async function thotPut(data) {
    await axios
      .put(`${baseURL}/thot/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        getThorgs(dispatch);
        dispatch({ type: SET_EDIT_TEXT, editText: "" });
      });
  }
  thotPut(data).catch((err) => {
    console.log(err);
    refreshAccessToken(dispatch).then(() => {
      thotPut(data).catch((err) => {
        alert("invalid PUT request");
        console.log(err);
      });
    });
  });
}

export function deleteThot(dispatch, thorg_id) {
  dispatch({ type: LOADING });
  async function thotDelete(thorg_id) {
    console.log("DELETE: ", thorg_id);
    await axios
      .delete(`${baseURL}/thot/` + thorg_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // window.location.reload();
        console.log(thorg_id);
        getThorgs(dispatch);
        // dispatch({
        //   type: THORG_DELETE,
        //   payload: thorg_id,
        // });
      })
      .then((response) => {
        dispatch({ type: SET_DROP_TRIGGER, payload: true });
      });
  }
  thotDelete(thorg_id).catch((err) => {
    refreshAccessToken().then(() => {
      thotDelete(thorg_id).catch((err) => {
        alert("invalid DELETE request");
        console.log(err);
      });
    });
  });
}
