import {
  CLOSE_LEFT_MENU,
  CLOSE_TOP_MENU,
  OPEN_LEFT_MENU,
  OPEN_TOP_MENU,
  SET_LOGIN_FORM_ERROR,
  START_SPINNER,
  STOP_SPINNER,
} from './ui.types';


export interface IOpenLeftMenuAction {
  type: typeof OPEN_LEFT_MENU,
}

export interface ICloseLeftMenuAction {
  type: typeof CLOSE_LEFT_MENU
}

export interface IOpenTopMenuAction {
  type: typeof OPEN_TOP_MENU
}

export interface ICloseTopMenuAction {
  type: typeof CLOSE_TOP_MENU
}

export interface IStartSpinnerAction {
  type: typeof START_SPINNER
}

export interface IStopSpinnerAction {
  type: typeof STOP_SPINNER
}

export interface ISetLoginErrorMessage {
  type: typeof SET_LOGIN_FORM_ERROR,
  payload: string
}

export const openLeftMenu = (): IOpenLeftMenuAction => {
  return {
    type: OPEN_LEFT_MENU,
  };
};

export const closeLeftMenu = (): ICloseLeftMenuAction => {
  return {
    type: CLOSE_LEFT_MENU,
  };
};

export const openTopMenu = (): IOpenTopMenuAction => {
  return {
    type: OPEN_TOP_MENU,
  };
};

export const closeTopMenu = (): ICloseTopMenuAction => {
  return {
    type: CLOSE_TOP_MENU,
  };
};

export const startSpinner = (): IStartSpinnerAction => {
  return {
    type: START_SPINNER,
  };
};

export const stopSpinner = (): IStopSpinnerAction => {
  return {
    type: STOP_SPINNER,
  };
};

export const setLoginErrorMessage = (message: string): ISetLoginErrorMessage => {
  return {
    type: SET_LOGIN_FORM_ERROR,
    payload: message,
  };
};

export type UiActionTypes = IOpenLeftMenuAction
  | ICloseLeftMenuAction
  | IOpenTopMenuAction
  | ICloseTopMenuAction
  | IStartSpinnerAction
  | IStopSpinnerAction
  | ISetLoginErrorMessage;
