import UserActionTypes from './user.types';

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
        registerErrorMessage:  null,
        currentUser: action.payload.data,
        token: action.payload.token,
      }
    }
    case UserActionTypes.REGISTER_FAILED: {
      return {
        ...state,
        isRegisterInProcess: false,
        registerErrorMessage: action.payload.message,
      };
    }
    default:
      return state;
  }
};
export default userReducer;
