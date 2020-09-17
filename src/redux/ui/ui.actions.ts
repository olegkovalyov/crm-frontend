import {
  CLOSE_LEFT_MENU,
  CLOSE_TOP_MENU,
  COLLAPSE_JUMPS_SUBMENU,
  COLLAPSE_USERS_SUBMENU,
  EXPAND_JUMPS_SUBMENU,
  EXPAND_USERS_SUBMENU,
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

export interface IExpandUsersSubMenuAction {
  type: typeof EXPAND_USERS_SUBMENU
}

export interface ICollapseUsersSubMenuAction {
  type: typeof COLLAPSE_USERS_SUBMENU
}

export interface IExpandJumpsSubMenuAction {
  type: typeof EXPAND_JUMPS_SUBMENU
}

export interface ICollapseJumpsSubMenuAction {
  type: typeof COLLAPSE_JUMPS_SUBMENU
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

export const expandUsersSubMenuAction = (): IExpandUsersSubMenuAction => {
  return {
    type: EXPAND_USERS_SUBMENU,
  };
};

export const expandJumpsSubMenuAction = (): IExpandJumpsSubMenuAction => {
  return {
    type: EXPAND_JUMPS_SUBMENU,
  };
};

export const collapseUsersSubMenuAction = (): ICollapseUsersSubMenuAction => {
  return {
    type: COLLAPSE_USERS_SUBMENU,
  };
};

export const collapseJumpsSubMenuAction = (): ICollapseJumpsSubMenuAction => {
  return {
    type: COLLAPSE_JUMPS_SUBMENU,
  };
};


export type UiActionTypes = IOpenLeftMenuAction
  | ICloseLeftMenuAction
  | IOpenTopMenuAction
  | ICloseTopMenuAction
  | IExpandJumpsSubMenuAction
  | ICollapseJumpsSubMenuAction
  | IExpandUsersSubMenuAction
  | ICollapseUsersSubMenuAction;
