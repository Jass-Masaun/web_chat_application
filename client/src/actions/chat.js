import axios from "axios";
import setAlert from "./alert";
import { CHAT_SUCCESS, CHAT_ERROR, RECIEVER_CHAT_SUCCESS } from "./types";

export const newChat = (message, sender, reciever) => async (dispatch) => {
  const data = {
    message: message,
    sender: sender,
    reciever: reciever,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/chat/`, data, config);
    dispatch({
      type: RECIEVER_CHAT_SUCCESS,
      payload: res.data.data,
    });
    return "success";
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    dispatch({
      type: CHAT_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getAllRecieversChats = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/`);
    dispatch({
      type: CHAT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    dispatch({
      type: CHAT_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getSelectedRecieverChat = (reciever) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/chat/${reciever}`);

    dispatch({
      type: RECIEVER_CHAT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(errors);
    errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    dispatch({
      type: CHAT_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
