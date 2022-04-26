import { combineReducers } from 'redux';
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  USER_RECEIVED,
  RESET_USER,
  USER_LIST_RECEIVED,
  MSG_RECEIVED,
  MSG_LIST_RECEIVED
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

/* Chat */
const initChat = {
  users: {},
  chatMsgs: [],
  unReadMsgCount: 0
};
function chat(state = initChat, action) {
  switch (action.type) {
    case MSG_LIST_RECEIVED:
      const { users, chatMsgs } = action.data;
      const unReadMsgCount = chatMsgs.filter((i) => !i.read).length;

      return { users, chatMsgs, unReadMsgCount };

    case MSG_RECEIVED:
      return action.data;
      break;
    default:
      return state;
  }
}

export default combineReducers({ user, userList, chat });
// exposed property structure: {user:{}, userList:[], chat：{}}
