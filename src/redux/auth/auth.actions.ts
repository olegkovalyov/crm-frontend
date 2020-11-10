import { LOGOUT, SET_REDIRECT_URL, SET_USER } from './auth.types';
import { AuthDataInterface } from '../../interfaces/auth.interface';


export interface LogoutActionInterface {
  type: typeof LOGOUT,
}

export interface SetUserActionInterface {
  type: typeof SET_USER,
  payload: AuthDataInterface,
}

export interface SetRedirectUrlActionInterface {
  type: typeof SET_REDIRECT_URL,
  payload: string | null
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

export const setRedirectUrlAction = (redirectUrl: string | null): SetRedirectUrlActionInterface => {
  return {
    type: SET_REDIRECT_URL,
    payload: redirectUrl,
  };
};


export type AuthActions = SetUserActionInterface
  | LogoutActionInterface
  | SetRedirectUrlActionInterface;
