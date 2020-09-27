import { LOGOUT, SET_USER } from './auth.types';
import { Login_login } from '../../interfaces/generated/Login';


export interface ILogoutAction {
  type: typeof LOGOUT,
}

export interface ISetUserAction {
  type: typeof SET_USER,
  payload: Login_login,
}

export const logoutAction = (): ILogoutAction => {
  return {
    type: LOGOUT,
  };
};

export const setUserAction = (data: Login_login): ISetUserAction => {
  return {
    type: SET_USER,
    payload: data,
  };
};



export type AuthActions = ISetUserAction
  | ILogoutAction;
