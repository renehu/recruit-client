import { combineReducers } from "redux";
import { AUTH_SUCCESS, ERROR_MSG } from "./action-types";
const initUser = {
  username: "",
  type: "",
  msg: "", // error msg
};

function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, ...action.data };
    case ERROR_MSG:
      return { ...state, msg: action.data };
    default:
      return state;
  }
}

export default combineReducers({ user });
