import {
  CHAT_SUCCESS,
  CHAT_ERROR,
  RECIEVER_CHAT_SUCCESS,
} from "../actions/types";

const initialState = {
  // participants: [],
  allRecieversChats: [],
  selectedRecieverChat: [],
  loading: true,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        //participants: payload.participants,
        allRecieversChats: payload.data,
        errors: null,
      };
    case RECIEVER_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedRecieverChat: payload,
        errors: null,
      };
    case CHAT_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
};
