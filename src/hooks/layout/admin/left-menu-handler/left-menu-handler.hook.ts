import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateInterface } from '../../../../redux/store';
import { closeLeftMenu, openLeftMenu } from '../../../../redux/layout/admin-layout/reducer/admin-layout.reducer';
import { logoutThunk } from '../../../../redux/auth/thunk/logout.thunk';

export const useLeftMenuHandler = () => {
  const dispatch = useDispatch();
  const isOpenedLeftMenu = useSelector((state: RootStateInterface) => state.adminLayout.isOpenedLeftMenu);

  const handleCloseLeftMenu = () => {
    dispatch(closeLeftMenu());
  };

  const handleOpenLeftMenu = () => {
    dispatch(openLeftMenu());
  };

  const handleLogout = (e: React.MouseEvent) => {
    dispatch(logoutThunk());
  };

  return {
    isOpenedLeftMenu,
    handleOpenLeftMenu,
    handleCloseLeftMenu,
    handleLogout,
  };
};
