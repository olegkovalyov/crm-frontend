import { UiActionTypes } from './ui.actions';
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

export interface IUiState {
  isOpenedLeftMenu: boolean,
  isOpenedTopMenu: boolean,
  isExpandedUsersSubMenu: boolean,
  isExpandedJumpsSubMenu: boolean,
}

export const uiState: IUiState = {
  isOpenedLeftMenu: true,
  isOpenedTopMenu: false,
  isExpandedJumpsSubMenu: false,
  isExpandedUsersSubMenu: false,
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
    case EXPAND_USERS_SUBMENU: {
      return {
        ...state,
        isExpandedUsersSubMenu: true,
      };
    }
    case COLLAPSE_USERS_SUBMENU: {
      return {
        ...state,
        isExpandedUsersSubMenu: false,
      };
    }
    case EXPAND_JUMPS_SUBMENU: {
      return {
        ...state,
        isExpandedJumpsSubMenu: true,
      };
    }
    case COLLAPSE_JUMPS_SUBMENU: {
      return {
        ...state,
        isExpandedJumpsSubMenu: false,
      };
    }
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
