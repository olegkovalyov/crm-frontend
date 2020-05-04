import { IRootState } from '../root.reducer';

export const isOpenedLeftMenuSelector = (state: IRootState) => {
  return state.ui.isOpenedLeftMenu;
};

export const isOpenedTopMenuSelector = (state: IRootState) => {
  return state.ui.isOpenedTopMenu;
};

export const needShowSpinner = (state: IRootState) => {
  return state.ui.showSpinner;
};

export const getLoginFormError = (state: IRootState) => {
  return state.ui.loginFormError;
};
