const initialState = {
  loading: false,
  sideNav: false,
  touchPosition: null,
  touchStopPosition: null,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SHOW_NAV: {
      return {
        ...state,
        sideNav: true,
      };
    }
    case HIDE_NAV: {
      return {
        ...state,
        sideNav: false,
      };
    }
    case SET_TOUCH_POSITION: {
      return {
        ...state,
        touchPosition: action.touchPosition,
      };
    }
    case SET_TOUCH_STOP_POSITION: {
      return {
        ...state,
        touchStopPosition: action.touchStopPosition,
      };
    }

    default:
      return state;
  }
}

export const LOADING = "loading/setLoading";
export const SHOW_NAV = "showNav/setShowNav";
export const HIDE_NAV = "hideNav/setShowNav";
export const SET_TOUCH_POSITION = "touchPosition/setTouchPosition";
export const SET_TOUCH_STOP_POSITION = "touchStopPosition/setTouchStopPosition";

// vercel
