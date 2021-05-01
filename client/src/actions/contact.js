import axios from "axios";
import setAlert from "./alert";
import { LOADED_CONTACTS, CREATED_CONTACT, CONTACTS_ERROR } from "./types";

export const loadContacts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/contact");
    dispatch({
      type: LOADED_CONTACTS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    dispatch({
      type: CONTACTS_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createContact = (email, name) => async (dispatch) => {
  const data = {
    email,
    name,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/contact", data, config);
    dispatch({
      type: CREATED_CONTACT,
      payload: res.data,
    });
    return "success";
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    dispatch({
      type: CONTACTS_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
