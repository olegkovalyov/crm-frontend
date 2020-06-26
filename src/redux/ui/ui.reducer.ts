import { UiActionTypes } from './ui.actions';
import {
  CLOSE_LEFT_MENU,
  CLOSE_TOP_MENU,
  OPEN_LEFT_MENU,
  OPEN_TOP_MENU,
  SET_LOGIN_FORM_ERROR, SET_REGISTER_FORM_ERROR,
  START_SPINNER,
  STOP_SPINNER,
} from './ui.types';

export interface IUiState {
  isOpenedLeftMenu: boolean,
  isOpenedTopMenu: boolean,
  showSpinner: boolean,
  loginFormError: string,
  registerFormError: string,
}

export const uiState: IUiState = {
  isOpenedLeftMenu: true,
  isOpenedTopMenu: false,
  showSpinner: false,
  loginFormError: '',
  registerFormError: '',
};

export const uiReducer = (state = uiState, action: UiActionTypes): IUiState => {
  switch (action.type) {
    case OPEN_LEFT_MENU: {
      return {
        ...state,
        isOpenedLeftMenu: true,
      };
    }
    case CLOSE_LEFT_MENU: {
      return {
        ...state,
        isOpenedLeftMenu: false,
      };
    }
    case OPEN_TOP_MENU: {
      return {
        ...state,
        isOpenedTopMenu: true,
      };
    }
    case CLOSE_TOP_MENU: {
      return {
        ...state,
        isOpenedTopMenu: false,
      };
    }
    case START_SPINNER: {
      return {
        ...state,
        showSpinner: true,
      };
    }
    case STOP_SPINNER: {
      return {
        ...state,
        showSpinner: false,
      };
    }
    case SET_LOGIN_FORM_ERROR: {
      return {
        ...state,
        loginFormError: action.payload,
      };
    }
    case SET_REGISTER_FORM_ERROR:
      return {
        ...state,
        registerFormError: action.payload,
      };
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
