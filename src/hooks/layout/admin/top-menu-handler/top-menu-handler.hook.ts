import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateInterface } from '../../../../redux/store';
import {
  closeLeftMenu,
  openLeftMenu,
  openTopMenu,
  closeTopMenu,
} from '../../../../redux/layout/admin-layout/reducer/admin-layout.reducer';
import { logoutThunk } from '../../../../redux/auth/thunk/logout.thunk';

export const useTopMenuHandler = () => {
  const dispatch = useDispatch();
  const isOpenedLeftMenu = useSelector((state: RootStateInterface) => state.adminLayout.isOpenedLeftMenu);
  const isOpenedTopMenu = useSelector((state: RootStateInterface) => state.adminLayout.isOpenedTopMenu);
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const handleOpenLeftMenu = () => {
    dispatch(openLeftMenu());
  };

  const handleCloseLeftMenu = () => {
    dispatch(closeLeftMenu());
  };

  const handleOpenTopMenu = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget);
    dispatch(openTopMenu());
  };

  const handleCloseTopMenu = () => {
    dispatch(closeTopMenu());
    setAnchorEl(null);
  };

  const handleLogout = (e: React.MouseEvent) => {
    dispatch(closeTopMenu());
    setAnchorEl(null);
    dispatch(logoutThunk());
  };

  return {
    isOpenedLeftMenu,
    isOpenedTopMenu,
    handleOpenLeftMenu,
    handleCloseLeftMenu,
    handleOpenTopMenu,
    handleCloseTopMenu,
    handleLogout,
    anchorEl,
  };
};
