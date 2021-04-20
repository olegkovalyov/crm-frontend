import { RootStateInterface } from '../root.reducer';

export const isOpenedLeftMenuSelector = (state: RootStateInterface): boolean => state.layout.isOpenedLeftMenu;

export const isOpenedTopMenuSelector = (state: RootStateInterface): boolean => state.layout.isOpenedTopMenu;

export const isExpandedMembersFilterSelector = (state: RootStateInterface): boolean => state.layout.isExpandedMembersFilter;

export const isExpandedClientsFilterSelector = (state: RootStateInterface): boolean => state.layout.isExpandedClientsFilter;
