import { UiActionTypes } from './ui.actions';
import { CLOSE_LEFT_MENU, CLOSE_TOP_MENU, OPEN_LEFT_MENU, OPEN_TOP_MENU, SET_BREADCRUMBS_DATA } from './ui.types';
import { BreadcrumbsDataInterface } from '../../interfaces/ui.interface';

export interface UiStateInterface {
  isOpenedLeftMenu: boolean,
  isOpenedTopMenu: boolean,
  breadCrumbsData: BreadcrumbsDataInterface[],
}

export const uiState: UiStateInterface = {
  isOpenedLeftMenu: true,
  isOpenedTopMenu: false,
  breadCrumbsData: [],
};

export const uiReducer = (state = uiState, action: UiActionTypes): UiStateInterface => {
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
    case SET_BREADCRUMBS_DATA: {
      return {
        ...state,
        breadCrumbsData: action.payload,
      };
    }
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
