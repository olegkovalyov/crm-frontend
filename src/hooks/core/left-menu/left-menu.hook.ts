import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootStateInterface } from '../../../redux/root.reducer';
import { isOpenedLeftMenuSelector } from '../../../redux/ui/ui.selector';
import { closeLeftMenuAction } from '../../../redux/ui/ui.actions';
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
