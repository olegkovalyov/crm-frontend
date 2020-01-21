import UserActionTypes from './user.types';
import {
  CHANGE_PASSWORD_ERROR_STATUS,
  CHANGE_PASSWORD_IN_PROCESS_STATUS,
  CHANGE_PASSWORD_INITIAL_STATUS,
  CHANGE_PASSWORD_SUCCESS_STATUS,
  FORGOT_PASSWORD_ERROR_STATUS,
  FORGOT_PASSWORD_IN_PROCESS_STATUS,
  FORGOT_PASSWORD_INITIAL_STATUS,
  FORGOT_PASSWORD_SUCCESS_STATUS,
} from '../../constants/user';

const initial_state = {
  // Auth
  currentUser: null,
  token: null,
  tokenExpiresAt: null,
  isLoginInProcess: false,
  loginErrorMessage: null,
  // Register
  isRegisterInProcess: false,
  registerErrorMessage: null,
  // Forgot password
  forgotPasswordStatus: FORGOT_PASSWORD_INITIAL_STATUS,
  forgotPasswordErrorMessage: null,
  changePasswordStatus: CHANGE_PASSWORD_INITIAL_STATUS,
  changePasswordErrorMessage: null,
};

const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case UserActionTypes.LOGIN_START: {
      return {
        ...state,
        isLoginInProcess: true,
        currentUser: null,
        token: null,
        loginErrorMessage: null,
      };
    }
    case UserActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginInProcess: false,
        currentUser: action.payload.data.user,
        token: action.payload.data.token,
        loginErrorMessage: null,
      };
    case UserActionTypes.LOGIN_FAILED: {
      return {
        ...state,
        isLoginInProcess: false,
        currentUser: null,
        token: null,
        loginErrorMessage: action.payload.message,
      };
    }
    case UserActionTypes.LOGOUT: {
      return {
        ...state,
        currentUser: null,
        token: null,
        loginErrorMessage: null,
      };
    }
    case UserActionTypes.REGISTER_START: {
      return {
        ...state,
        isRegisterInProcess: true,
      };
    }
    case UserActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isRegisterInProcess: false,
        registerErrorMessage: null,
        currentUser: action.payload.data,
        token: action.payload.token,
      };
    }
    case UserActionTypes.REGISTER_FAILED: {
      return {
        ...state,
        isRegisterInProcess: false,
        registerErrorMessage: action.payload.message,
      };
    }
    case UserActionTypes.FORGOT_PASSWORD_START: {
      return {
        ...state,
        forgotPasswordStatus: FORGOT_PASSWORD_IN_PROCESS_STATUS,
      };
    }
    case UserActionTypes.FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordStatus: FORGOT_PASSWORD_ERROR_STATUS,
        forgotPasswordErrorMessage: action.payload.message,
      };
    }
    case UserActionTypes.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordStatus: FORGOT_PASSWORD_SUCCESS_STATUS,
      };
    }
    case UserActionTypes.CHANGE_PASSWORD_START: {
      return {
        ...state,
        changePasswordStatus: CHANGE_PASSWORD_IN_PROCESS_STATUS,
      };
    }
    case UserActionTypes.CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        changePasswordStatus: CHANGE_PASSWORD_ERROR_STATUS,
        changePasswordErrorMessage: action.payload.message,
      };
    }
    case UserActionTypes.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePasswordStatus: CHANGE_PASSWORD_SUCCESS_STATUS,
      };
    }
    default:
      return state;
  }
};
export default userReducer;
