import { LOGOUT, SET_USER } from './auth.types';
import { AuthDataInterface } from '../../interfaces/auth.interface';


export interface LogoutActionInterface {
  type: typeof LOGOUT,
}

export interface SetUserActionInterface {
  type: typeof SET_USER,
  payload: AuthDataInterface,
}

export const logoutAction = (): LogoutActionInterface => {
  return {
    type: LOGOUT,
  };
};

export const setUserAction = (authData: AuthDataInterface): SetUserActionInterface => {
  return {
    type: SET_USER,
    payload: authData,
  };
};


export type AuthActions = SetUserActionInterface
  | LogoutActionInterface;
