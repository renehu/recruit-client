import { combineReducers } from 'redux';
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  USER_RECEIVED,
  RESET_USER,
  USER_LIST_RECEIVED
} from './action-types';
import { getRedirectUrl } from '../utils';

// user
const initUser = {
  username: '',
  type: '',
  msg: '', // error msg
  redirectTo: ''
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

// userList
const initUserList = [];
function userList(state = initUserList, action) {
  switch (action.type) {
    case USER_LIST_RECEIVED:
      return action.data;

    default:
      return state;
  }
}

export default combineReducers({ user, userList });
// exposed property structure: {user:{}, userList:[]}
