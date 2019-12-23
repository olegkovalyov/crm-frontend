import {userActionTypes} from './user.types';

export const setUser = (user) => {
  return {
    type: userActionTypes.SET_USER,
    payload: user,
  };
};
