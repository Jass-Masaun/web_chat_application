import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOADED_USER,
  AUTH_ERROR,
  LOGOUT,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADED_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTRATION_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.data);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT:
    case LOGIN_FAILED:
    case REGISTRATION_FAILED:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};

export default auth;
