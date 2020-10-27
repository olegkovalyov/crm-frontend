import { RootStateInterface } from '../root.reducer';
import { BreadcrumbsDataInterface } from '../../interfaces/ui.interface';

export const isOpenedLeftMenuSelector = (state: RootStateInterface): boolean => {
  return state.ui.isOpenedLeftMenu;
};

export const isOpenedTopMenuSelector = (state: RootStateInterface): boolean => {
  return state.ui.isOpenedTopMenu;
};

export const getBreadcrumbsDataSelector = (state: RootStateInterface): BreadcrumbsDataInterface[] => {
  return state.ui.breadCrumbsData;
};
