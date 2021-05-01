import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import setAlert from "./alert";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOADED_USER,
  AUTH_ERROR,
  LOGOUT,
} from "./types";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`api/auth`);

    dispatch({
      type: LOADED_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post("/api/auth/", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.message, "danger")));

    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const registerUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    name,
    email,
    password,
  });

  try {
    const res = await axios.post("/api/user/", body, config);
    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }

    dispatch({
      type: REGISTRATION_FAILED,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
