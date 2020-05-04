import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from './auth.types';
import { IAuthLoginRequestData, IAuthLoginResponseData } from '../../interfaces/auth.interface';


export interface ILoginStartAction {
  type: typeof LOGIN_START,
  payload: IAuthLoginRequestData,
}

export interface ILoginSuccessAction {
  type: typeof LOGIN_SUCCESS,
  payload: IAuthLoginResponseData
}

export interface ILoginFailedAction {
  type: typeof LOGIN_FAILED,
}

export interface ILogoutAction {
  type: typeof LOGOUT,
}


export const loginStartAction = (data: IAuthLoginRequestData): ILoginStartAction => {
  return {
    type: LOGIN_START,
    payload: data,
  };
};

export const loginSuccessAction = (data: IAuthLoginResponseData): ILoginSuccessAction => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailedAction = (): ILoginFailedAction => {
  return {
    type: LOGIN_FAILED,
  };
};

export const logoutAction = (): ILogoutAction => {
  return {
    type: LOGOUT,
  };
};


export type AuthActions = ILoginStartAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutAction;
