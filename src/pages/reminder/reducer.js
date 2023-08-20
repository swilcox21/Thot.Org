const initialState = {
  dashboard: null,
  text: "",
  editText: "",
  checked: false,
  showFull: false,
  showDash: false,
  reminderToggle: false,
  dropTrigger: false,
  reminders: [],
  thorgs: [],
  wrapperSize: {},
  contSize: {},
  footSize: {},
};

export default function reminderReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case DASHBOARD: {
      return {
        ...state,
        dashboard: action.dashboard,
      };
    }
    case SET_WRAP_POSITION: {
      return {
        ...state,
        wrapperSize: action.screenSize,
      };
    }
    case SET_CONT_POSITION: {
      return {
        ...state,
        contSize: action.screenSize,
      };
    }
    case SET_FOOT_POSITION: {
      return {
        ...state,
        footSize: action.screenSize,
      };
    }
    case SET_TEXT: {
      return { ...state, text: action.text };
    }
    case TEXT_RESET: {
      return { ...state, text: "" };
    }
    // editText
    case SET_EDIT_TEXT: {
      return { ...state, editText: action.editText };
    }
    case EDIT_TEXT_RESET: {
      return { ...state, editText: "" };
    }
    // checked
    case SET_CHECKED: {
      return { ...state, checked: !action.checked };
    }
    case CHECKED_RESET: {
      return { ...state, checked: false };
    }
    // showFull
    case SET_SHOW_FULL: {
      return { ...state, showFull: action.showFull };
    }
    // showDash
    case SET_SHOW_DASH: {
      return { ...state, showDash: !action.showDash };
    }
    // reminderToggle
    case SET_REMINDER_TOGGLE: {
      return { ...state, reminderToggle: action.reminderToggle };
    }
    // dropTrigger
    case SET_DROP_TRIGGER: {
      return { ...state, dropTrigger: action.payload };
    }

    // reminders
    case REMINDER_GET: {
      console.log("DELTE_GET: ", action.reminders);
      return {
        ...state,
        loading: false,
        reminders: action.reminders,
      };
    }
    case REMINDER_POST: {
      return {
        ...state,
        reminders: [...state.reminders, action.payload[0]],
        loading: false,
        text: "",
        checked: false,
      };
    }
    case REMINDER_PUT: {
      return {
        ...state,
        reminders: [
          ...state.reminders.filter(
            (reminder) => reminder.id !== action.payload.id
          ),
          action.payload,
        ],
        loading: false,
        editText: "",
      };
    }
    case REMINDER_DELETE: {
      console.log(action.payload);
      return {
        ...state,
        reminders: state.reminders.filter(
          (reminder) => reminder.id !== action.payload
        ),
        loading: false,
      };
    }
    // thorgs
    case THORG_GET: {
      console.log("DELTE_GET: ", action.thorgs);
      return {
        ...state,
        loading: false,
        thorgs: action.thorgs,
      };
    }
    case THORG_POST: {
      return {
        ...state,
        thorgs: [...state.thorgs, action.payload[0]],
        loading: false,
        text: "",
        checked: false,
      };
    }
    case THORG_PUT: {
      return {
        ...state,
        thorgs: [
          ...state.thorgs.filter((thorg) => thorg.id !== action.payload.id),
          action.payload,
        ],
        loading: false,
        editText: "",
      };
    }
    case THORG_DELETE: {
      console.log(action.payload);
      return {
        ...state,
        thorgs: state.thorgs.filter((thorg) => thorg.id !== action.payload),
        loading: false,
      };
    }
    // thorgs
    case THORG_GET: {
      console.log("DELTE_GET: ", action.thots);
      return {
        ...state,
        loading: false,
        thots: action.thots,
      };
    }
    case THOT_POST: {
      return {
        ...state,
        thots: [...state.thots, action.payload[0]],
        loading: false,
        text: "",
        checked: false,
      };
    }
    case THOT_PUT: {
      return {
        ...state,
        thots: [
          ...state.thots.filter((thot) => thot.id !== action.payload.id),
          action.payload,
        ],
        loading: false,
        editText: "",
      };
    }
    case THOT_DELETE: {
      console.log(action.payload);
      return {
        ...state,
        thots: state.thots.filter((thot) => thot.id !== action.payload),
        loading: false,
      };
    }
    default:
      return state;
  }
}

export const LOADING = "reminder/loadStart";
export const DASHBOARD = "reminder/dashboard";
export const SET_TEXT = "text/setText";
export const TEXT_RESET = "text/textreset";
export const SET_EDIT_TEXT = "text/editText";
export const EDIT_TEXT_RESET = "text/editTextReset";
export const SET_CHECKED = "checked/setChecked";
export const CHECKED_RESET = "checked/checkedReset";
export const SET_SHOW_DASH = "showFull/setShowFull";
export const SET_SHOW_FULL = "showFull/setShowFull";
export const SET_REMINDER_TOGGLE = "reminderToggle/setReminderToggle";
export const SET_DROP_TRIGGER = "dropTrigger/setDropTrigger";
export const REMINDER_GET = "reminder/reminderGet";
export const REMINDER_POST = "reminder/reminderPost";
export const REMINDER_PUT = "reminder/reminderPut";
export const REMINDER_DELETE = "reminder/reminderDelete";
export const THORG_GET = "thorg/thorgGet";
export const THORG_POST = "thorg/thorgPost";
export const THORG_PUT = "thorg/thorgPut";
export const THORG_DELETE = "thorg/thorgDelete";
export const THOT_GET = "thot/thotGet";
export const THOT_POST = "thot/thotPost";
export const THOT_PUT = "thot/thotPut";
export const THOT_DELETE = "thot/thotDelete";
export const SET_WRAP_POSITION = "wrap/wrapPosition";
export const SET_CONT_POSITION = "cont/contPosition";
export const SET_FOOT_POSITION = "foot/foot Position";
// vercel
