import io from 'socket.io-client';

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqMsgList,
  reqMsgRead
} from '../api';

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  USER_RECEIVED,
  RESET_USER,
  USER_LIST_RECEIVED,
  MSG_RECEIVED,
  MSG_LIST_RECEIVED
} from './action-types';

// dispatch actions

/* ---SYNC ACTIONS--- */
// auth success sync action
const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  data: user
});

// error msg sync action
const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: msg
});

const userReceived = (user) => ({ type: USER_RECEIVED, data: user });

export const resetUser = (msg) => ({ type: RESET_USER, data: msg });

export const userListReceived = (userList) => ({ type: USER_LIST_RECEIVED, data: userList });

// chat msg sync action
export const msgListReceived = ({ users, chatMsgs }) => ({
  type: MSG_LIST_RECEIVED,
  data: { users, chatMsgs }
});

/*  ---ASYNC ACTIONS--- 
  1) ajax 
  2) dispatch sync action
*/

// register async action
export const register = (user) => {
  const { username, password, confirmPassword } = user;

  if (password !== confirmPassword) {
    // error msg sync action
    return errorMsg('The two passwords you entered did not match.');
  } else if (!username) {
    return errorMsg('The user name cannot be empty');
  }

  return async (dispatch) => {
    //   const promise = reqRegister(user);
    //   promise.then(response=>{
    //       const result = response.data;
    //   })
    const response = await reqRegister(user);
    const result = response.data;

    if (result.code === 0) {
      getMsgList(dispatch); // get msg list when register succeeds
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

// login async action
export const login = (user) => {
  const { username, password } = user;

  if (!username) {
    // error msg sync action
    return errorMsg('Username cannot be empty.');
  } else if (!password) {
    return errorMsg('Password cannot be empty.');
  }

  return async (dispatch) => {
    const response = await reqLogin(user);
    const result = response.data;

    if (result.code === 0) {
      getMsgList(dispatch); //get msg list when login succeeds
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

// update user info async action
export const updateUser = (user) => {
  return async (dispatch) => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(userReceived(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

// get user data for auto login
export const getUser = () => {
  return async (dispatch) => {
    const response = await reqUser();
    const result = response.data;

    if (result.code === 0) {
      getMsgList(dispatch); //get msg list when auto-login succeeds
      dispatch(userReceived(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

// get user list
export const getUserList = (type) => {
  return async (dispatch) => {
    const response = await reqUserList(type);
    const result = response.data;

    if (result.code === 0) {
      dispatch(userListReceived(result.data));
    }
  };
};

/* Chat */
async function getMsgList(dispatch) {
  initIO(); //initIO monitor when get msg list

  const response = await reqMsgList();
  const result = response.data;
  if (result.code === 0) {
    const { users, chatMsgs } = result.data;
    // dispatch action
    dispatch(msgListReceived({ users, chatMsgs }));
  }
}

function initIO() {
  if (!io.socket) {
    io.socket = io('ws://localhost:4000');
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log('client get msg from server', chatMsg);
    });
  }
}

export const sendMsg = ({ from, to, content }) => {
  return (dispatch) => {
    console.log('Client send msg to Server', from, content, to);
    io.socket.emit('sendMsg', { from, to, content });
  };
};
