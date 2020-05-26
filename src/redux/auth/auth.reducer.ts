import { AuthActions } from './auth.actions';
import { LOGOUT, SET_USER } from './auth.types';
import { Login_login_user } from '../../interfaces/generated/Login';


export interface IAuthState {
  currentUser: Login_login_user | null,
  token: string | null,
}

export const authState: IAuthState = {
  currentUser: null,
  token: null,
};

export const authReducer = (state = authState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        token: null,
      };
    case SET_USER: {
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
      };
    }
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
