import UserActionTypes from './user.types';

const initial_state = {
  currentUser: null,
  token: null,
  tokenExpiresAt: null,
  isLoginInProcess: false,
  loginErrorMessage: null,
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
    default:
      return state;
  }
};
export default userReducer;
