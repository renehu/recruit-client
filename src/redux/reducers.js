import { combineReducers } from "redux";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  USER_RECEIVED,
  RESET_USER,
} from "./action-types";
import { getRedirectUrl } from "../utils";

const initUser = {
  username: "",
  type: "",
  msg: "", // error msg
  redirectTo: "",
};

function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { type, avatar } = action.data;
      return { ...action.data, redirectTo: getRedirectUrl(type, avatar) };

    case ERROR_MSG:
      return { ...state, msg: action.data };

    //update user info success:
    case USER_RECEIVED:
      return action.data;

    //update user info error:
    case RESET_USER:
      return { ...initUser, msg: action.data };

    default:
      return state;
  }
}

export default combineReducers({ user });
