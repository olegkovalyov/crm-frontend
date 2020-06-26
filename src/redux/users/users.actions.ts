import { ADD_USER, SET_USERS } from './users.types';
import { GetUsers_getUsers } from '../../interfaces/generated/GetUsers';


export interface ISetUsersAction {
  type: typeof SET_USERS,
  payload: GetUsers_getUsers[]
}

export interface IAddUserAction {
  type: typeof ADD_USER,
  payload: GetUsers_getUsers
}


export const setUsers = (users: GetUsers_getUsers[]): ISetUsersAction => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

export const addUser = (user: GetUsers_getUsers): IAddUserAction => {
  return {
    type: ADD_USER,
    payload: user,
  };
};


export type UsersActionTypes = ISetUsersAction
  | IAddUserAction;
