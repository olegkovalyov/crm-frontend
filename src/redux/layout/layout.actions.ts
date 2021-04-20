import {
  CLOSE_LEFT_MENU,
  CLOSE_TOP_MENU, COLLAPSE_CLIENTS_FILTER,
  COLLAPSE_MEMBERS_FILTER, EXPAND_CLIENTS_FILTER,
  EXPAND_MEMBERS_FILTER,
  OPEN_LEFT_MENU,
  OPEN_TOP_MENU,
} from './layout.types';


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

export interface ExpandMembersFilterActionInterface {
  type: typeof EXPAND_MEMBERS_FILTER
}

export interface CollapseMembersFilterActionInterface {
  type: typeof COLLAPSE_MEMBERS_FILTER
}

export interface ExpandClientsFilterActionInterface {
  type: typeof EXPAND_CLIENTS_FILTER
}

export interface CollapseClientsFilterActionInterface {
  type: typeof COLLAPSE_CLIENTS_FILTER
}

export const openLeftMenuAction = (): OpenLeftMenuActionInterface => ({
  type: OPEN_LEFT_MENU,
});

export const closeLeftMenuAction = (): CloseLeftMenuActionInterface => ({
  type: CLOSE_LEFT_MENU,
});

export const openTopMenuAction = (): OpenTopMenuActionInterface => ({
  type: OPEN_TOP_MENU,
});

export const closeTopMenuAction = (): CloseTopMenuActionInterface => ({
  type: CLOSE_TOP_MENU,
});

export const expandMembersFilterAction = (): ExpandMembersFilterActionInterface => ({
  type: EXPAND_MEMBERS_FILTER,
});

export const collapseMembersFilterAction = (): CollapseMembersFilterActionInterface => ({
  type: COLLAPSE_MEMBERS_FILTER,
});

export const expandClientsFilterAction = (): ExpandClientsFilterActionInterface => ({
  type: EXPAND_CLIENTS_FILTER,
});

export const collapseClientsFilterAction = (): CollapseClientsFilterActionInterface => ({
  type: COLLAPSE_CLIENTS_FILTER,
});

export type LayoutActionTypes = OpenLeftMenuActionInterface
  | CloseLeftMenuActionInterface
  | OpenTopMenuActionInterface
  | CloseTopMenuActionInterface
  | ExpandMembersFilterActionInterface
  | CollapseMembersFilterActionInterface
  | ExpandClientsFilterActionInterface
  | CollapseClientsFilterActionInterface;
