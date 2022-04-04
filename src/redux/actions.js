import { reqRegister, reqLogin } from "../api";
import { AUTH_SUCCESS, ERROR_MSG } from "./action-types";

// dispatch actions

// sync actions
// auth success sync action
const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  data: user,
});

// error msg sync action
const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: msg,
});

// async actions
// register async action
export const register = (user) => {
  return async (dispatch) => {
    //   const promise = reqRegister(user);
    //   promise.then(response=>{
    //       const result = response.data;
    //   })
    const response = await reqRegister(user);
    const result = response.data;
    if (result?.code === 0) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

// login async action
export const login = (user) => {
  return async (dispatch) => {
    const response = await reqLogin(user);
    const result = response.data;
    if (result?.code === 0) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};
