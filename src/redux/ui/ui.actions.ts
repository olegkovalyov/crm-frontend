import { CLOSE_LEFT_MENU, CLOSE_TOP_MENU, OPEN_LEFT_MENU, OPEN_TOP_MENU, SET_BREADCRUMBS_DATA } from './ui.types';
import { BreadcrumbsDataInterface } from '../../interfaces/ui.interface';


export interface OpenLeftMenuActionInterface {
  type: typeof OPEN_LEFT_MENU,
}

export interface CloseLeftMenuActionInterface {
  type: typeof CLOSE_LEFT_MENU
}

export interface OpenTopMenuActionInterface {
  type: typeof OPEN_TOP_MENU
}

export interface CloseTopMenuActionInterface {
  type: typeof CLOSE_TOP_MENU
}

export interface SetBreadcrumbDataInterface {
  type: typeof SET_BREADCRUMBS_DATA,
  payload: BreadcrumbsDataInterface[],
}

export const openLeftMenuAction = (): OpenLeftMenuActionInterface => {
  return {
    type: OPEN_LEFT_MENU,
  };
};

export const closeLeftMenuAction = (): CloseLeftMenuActionInterface => {
  return {
    type: CLOSE_LEFT_MENU,
  };
};

export const openTopMenuAction = (): OpenTopMenuActionInterface => {
  return {
    type: OPEN_TOP_MENU,
  };
};

export const closeTopMenuAction = (): CloseTopMenuActionInterface => {
  return {
    type: CLOSE_TOP_MENU,
  };
};

export const setBreadcrumbsDataAction = (data: BreadcrumbsDataInterface[]): SetBreadcrumbDataInterface => {
  return {
    type: SET_BREADCRUMBS_DATA,
    payload: data,
  };
};



export type UiActionTypes = OpenLeftMenuActionInterface
  | CloseLeftMenuActionInterface
  | OpenTopMenuActionInterface
  | CloseTopMenuActionInterface
  | SetBreadcrumbDataInterface;
