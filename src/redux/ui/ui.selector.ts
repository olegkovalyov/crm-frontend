import { IRootState } from '../root.reducer';

export const isOpenedLeftMenuSelector = (state: IRootState): boolean => {
  return state.ui.isOpenedLeftMenu;
};

export const isOpenedTopMenuSelector = (state: IRootState): boolean => {
  return state.ui.isOpenedTopMenu;
};

export const isExpandedUsersSubMenuSelector = (state: IRootState): boolean => {
  return state.ui.isExpandedUsersSubMenu;
};

export const isExpandedJumpsSubMenuSelector = (state: IRootState): boolean => {
  return state.ui.isExpandedJumpsSubMenu;
};
