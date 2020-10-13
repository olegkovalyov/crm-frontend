import {
  CLOSE_LEFT_MENU,
  CLOSE_TOP_MENU,
  OPEN_LEFT_MENU,
  OPEN_TOP_MENU,
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

export const openLeftMenuAction = (): IOpenLeftMenuAction => {
  return {
    type: OPEN_LEFT_MENU,
  };
};

export const closeLeftMenuAction = (): ICloseLeftMenuAction => {
  return {
    type: CLOSE_LEFT_MENU,
  };
};

export const openTopMenuAction = (): IOpenTopMenuAction => {
  return {
    type: OPEN_TOP_MENU,
  };
};

export const closeTopMenuAction = (): ICloseTopMenuAction => {
  return {
    type: CLOSE_TOP_MENU,
  };
};



export type UiActionTypes = IOpenLeftMenuAction
  | ICloseLeftMenuAction
  | IOpenTopMenuAction
  | ICloseTopMenuAction;
