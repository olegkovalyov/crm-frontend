import { AuthActions } from './auth.actions';
import { LOGOUT, SET_USER } from './auth.types';
import { Login_login_user } from '../../interfaces/generated/Login';


export interface IAuthState {
  currentUser: Login_login_user | null,
  accessToken: string | null,
  refreshTokenExists: boolean,
}

export const authState: IAuthState = {
  currentUser: null,
  accessToken: null,
  refreshTokenExists: false,
};

export const authReducer = (state = authState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        accessToken: null,
        refreshTokenExists: false,
      };
    case SET_USER: {
      return {
        ...state,
        currentUser: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshTokenExists: true,
      };
    }
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
