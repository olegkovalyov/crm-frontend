import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateInterface } from '../../../redux/root.reducer';
import { isOpenedLeftMenuSelector } from '../../../redux/layout/layout.selector';
import { closeLeftMenuAction } from '../../../redux/layout/layout.actions';
import { useLogoutQuery } from '../../graphql/queries/logout/logout.query.hook';

export const useLeftMenu = () => {
  const dispatch = useDispatch();
  const isOpenedLeftMenu = useSelector((state: RootStateInterface) => isOpenedLeftMenuSelector(state));

  const closeLeftMenu = () => {
    dispatch(closeLeftMenuAction());
  };

  const { handleLogout } = useLogoutQuery();

  const logout = (e: React.MouseEvent) => {
    handleLogout();
  };

  return {
    logout,
    isOpenedLeftMenu,
    closeLeftMenu,
  };
};
