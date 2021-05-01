import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 } from "uuid";

export default (message, alertType, timeOut = 3000) => (dispatch) => {
  const id = v4();

  dispatch({
    type: SET_ALERT,
    payload: { id, message, alertType },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: { id } }), timeOut);
};
