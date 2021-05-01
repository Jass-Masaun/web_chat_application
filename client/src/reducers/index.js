import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import contact from "./contact";
import chat from "./chat";

export default combineReducers({
  alert,
  auth,
  contact,
  chat,
});
