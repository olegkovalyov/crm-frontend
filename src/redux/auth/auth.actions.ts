import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_START,
  REGISTER_SUCCESS,
} from './auth.types';
import {
  IAuthLoginRequestData,
  IAuthRegisterRequestData,
  IAuthSuccessResponseData,
} from '../../interfaces/auth.interface';


export interface ILoginStartAction {
  type: typeof LOGIN_START,
  payload: IAuthLoginRequestData,
}

export interface ILoginSuccessAction {
  type: typeof LOGIN_SUCCESS,
  payload: IAuthSuccessResponseData
}

export interface ILoginFailedAction {
  type: typeof LOGIN_FAILED,
}

export interface ILogoutAction {
  type: typeof LOGOUT,
}

export interface IRegisterStartAction {
  type: typeof REGISTER_START,
  payload: IAuthRegisterRequestData,
}

export interface IRegisterSuccessAction {
  type: typeof REGISTER_SUCCESS,
  payload: IAuthSuccessResponseData
}

export interface IRegisterFailedAction {
  type: typeof REGISTER_FAILED,
}


export const loginStartAction = (data: IAuthLoginRequestData): ILoginStartAction => {
  return {
    type: LOGIN_START,
    payload: data,
  };
};

export const loginSuccessAction = (data: IAuthSuccessResponseData): ILoginSuccessAction => {
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

export const registerStartAction = (data: IAuthRegisterRequestData): IRegisterStartAction => {
  return {
    type: REGISTER_START,
    payload: data,
  };
};

export const registerSuccessAction = (data: IAuthSuccessResponseData): IRegisterSuccessAction => {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
};

export const registerFailedAction = (): IRegisterFailedAction => {
  return {
    type: REGISTER_FAILED,
  };
};


export type AuthActions = ILoginStartAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutAction
  | IRegisterStartAction
  | IRegisterSuccessAction
  | IRegisterFailedAction;
