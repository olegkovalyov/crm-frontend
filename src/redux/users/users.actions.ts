import { SET_USERS, SET_USER_ROLES_OPTIONS_FOR_FILTER, SET_USER_STATUS_OPTIONS_FOR_FILTER } from './users.types';
import { UserRole, UserStatus } from '../../interfaces/generated/globalTypes';
import { UserInterface } from '../../interfaces/user.interface';


export interface SetUserRolesOptionsForFilterActionInterface {
  type: typeof SET_USER_ROLES_OPTIONS_FOR_FILTER,
  payload: UserRole[],
}

export interface SetUserStatusOptionsForFilterActionInterface {
  type: typeof SET_USER_STATUS_OPTIONS_FOR_FILTER,
  payload: UserStatus[],
}

export interface SetUsersActionInterface {
  type: typeof SET_USERS,
  payload: UserInterface[],
}

export const setUserRolesOptionsForFilterAction = (roles: UserRole[]): SetUserRolesOptionsForFilterActionInterface => ({
  type: SET_USER_ROLES_OPTIONS_FOR_FILTER,
  payload: roles,
});

export const setUserStatusOptionsForFilterAction = (statuses: UserStatus[]): SetUserStatusOptionsForFilterActionInterface => ({
  type: SET_USER_STATUS_OPTIONS_FOR_FILTER,
  payload: statuses,
});

export const setUsersAction = (users: UserInterface[]): SetUsersActionInterface => ({
  type: SET_USERS,
  payload: users,
});


export type UsersActionTypes = SetUserRolesOptionsForFilterActionInterface
  | SetUserStatusOptionsForFilterActionInterface
  | SetUsersActionInterface;
