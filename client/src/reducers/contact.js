import {
  LOADED_CONTACTS,
  CREATED_CONTACT,
  CONTACTS_ERROR,
} from "../actions/types";

const initialState = {
  contacts: [],
  contact: null,
  loading: true,
  errors: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADED_CONTACTS:
    case CREATED_CONTACT:
      return {
        ...state,
        loading: false,
        contacts: payload,
        errors: null,
      };
    case CONTACTS_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload.data,
        contacts: [],
      };
    default:
      return state;
  }
};
