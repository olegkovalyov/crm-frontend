import { AuthActions } from './auth.actions';
import { LOGOUT, SET_REDIRECT_URL, SET_USER } from './auth.types';
import { MemberInterface } from '../../interfaces/member.interface';


export interface AuthStateInterface {
  currentUser: MemberInterface | null,
  accessToken: string | null,
  refreshTokenExists: boolean,
  redirectUrl: string | null,
}

export const authState: AuthStateInterface = {
  currentUser: null,
  accessToken: null,
  refreshTokenExists: false,
  redirectUrl: null,
};

export const authReducer = (state = authState, action: AuthActions): AuthStateInterface => {
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
    case SET_REDIRECT_URL: {
      return {
        ...state,
        redirectUrl: action.payload,
      };
    }
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
