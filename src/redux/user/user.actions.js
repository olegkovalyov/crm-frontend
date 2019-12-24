import UserActionTypes from './user.types';

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
