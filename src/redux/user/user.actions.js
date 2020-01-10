import UserActionTypes from './user.types';

// Auth | Login

export const setUser = (user) => {
  return {
    type: UserActionTypes.SET_USER,
    payload: user,
  };
};

export const loginStart = (data) => {
  return {
    type: UserActionTypes.LOGIN_START,
    payload: data,
  };
};

export const loginSuccess = (data) => {
  return {
    type: UserActionTypes.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailed = (data) => {
  return {
    type: UserActionTypes.LOGIN_FAILED,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: UserActionTypes.LOGOUT,
  };
};

// Register
export const registerStart = (data) => {
  return {
    type: UserActionTypes.REGISTER_START,
    payload: data,
  };
};

export const registerSuccess = (data) => {
  return {
    type: UserActionTypes.REGISTER_SUCCESS,
    payload: data,
  };
};

export const registerFailed = (data) => {
  return {
    type: UserActionTypes.REGISTER_FAILED,
    payload: data,
  };
};
