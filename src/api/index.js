import ajax from "./ajax";

// user register
export const reqRegister = (user) => {
  ajax("/register", user, "POST");
};

// login
export const reqLogin = ({ username, password }) => {
  ajax("/login", { username, password }, "POST");
};

// update user data
export const reqUpdateUser = (user) => {
  ajax("/udpate", user, "POST");
};
