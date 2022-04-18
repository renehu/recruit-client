// call API

import ajax from './ajax';

// user register
export const reqRegister = (user) => ajax('/api/register', user, 'POST');

// login
export const reqLogin = ({ username, password }) =>
  ajax('/api/login', { username, password }, 'POST');

// update user data
export const reqUpdateUser = (user) => ajax('/api/update', user, 'POST');

// GET method for get user
export const reqUser = () => ajax('/api/user');
