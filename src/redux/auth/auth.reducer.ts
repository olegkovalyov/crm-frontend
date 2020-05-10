import { AuthActions } from './auth.actions';
import { ICurrentUser } from '../../interfaces/auth.interface';
import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_START,
  REGISTER_SUCCESS,
} from './auth.types';


export interface IAuthState {
  currentUser: ICurrentUser | null,
  token: string | null,
}

export const authState: IAuthState = {
  currentUser: null,
  token: null,
};

export const authReducer = (state = authState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        token: action.payload.token,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        currentUser: null,
        token: null,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        token: null,
      };

    case REGISTER_START :
      return {
        ...state,
        currentUser: null,
        token: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        token: action.payload.token,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        currentUser: null,
        token: null,
      };
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
