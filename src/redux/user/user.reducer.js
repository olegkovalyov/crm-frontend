import UserActionTypes from './user.types';

const initial_state = {
  currentUser: null,
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
      };
    }
    case UserActionTypes.LOGIN_SUCCESS:
    case UserActionTypes.LOGIN_FAILED: {
      return {
        ...state,
        isLoginInProcess: false,
      };
    }
    default:
      return state;
  }
};
export default userReducer;
