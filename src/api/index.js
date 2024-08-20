// call API

import ajax from "./ajax";

const API_BASE_URL = "https://recruit.renehu.net/api";

/* User */
// login
export const reqLogin = ({ username, password }) =>
  ajax(`${API_BASE_URL}/login`, { username, password }, "POST");

// user register
export const reqRegister = (user) => ajax("/api/register", user, "POST");

// update user data
export const reqUpdateUser = (user) => ajax("/api/update", user, "POST");

// GET method for get user
export const reqUser = () => ajax(`${API_BASE_URL}/user`);

// GET method for get user list
export const reqUserList = (type) => ajax("/api/userlist", { type });

/* Chat */
//export const reqSendMsg = (data) => ajax('/api/sendmsg', data, 'POST');

export const reqMsgList = () => ajax("/api/msglist");

// mark msg read
export const reqMsgRead = (from) => ajax("/api/msgread", { from }, "POST");
