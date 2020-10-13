import { IRootState } from '../root.reducer';

export const isOpenedLeftMenuSelector = (state: IRootState): boolean => {
  return state.ui.isOpenedLeftMenu;
};

export const isOpenedTopMenuSelector = (state: IRootState): boolean => {
  return state.ui.isOpenedTopMenu;
};
