import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutAction } from '../../redux/auth/auth.actions';
import { IRootState } from '../../redux/root.reducer';
import {
  isExpandedJumpsSubMenuSelector,
  isExpandedUsersSubMenuSelector,
  isOpenedLeftMenuSelector,
} from '../../redux/ui/ui.selector';
import {
  closeLeftMenuAction,
  collapseJumpsSubMenuAction,
  collapseUsersSubMenuAction,
  expandJumpsSubMenuAction,
  expandUsersSubMenuAction,
} from '../../redux/ui/ui.actions';
import { url } from '../../constants/url';

export const useLeftMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isOpenedLeftMenu = useSelector((state: IRootState) => isOpenedLeftMenuSelector(state));
  const isExpandedUsersSubmenu = useSelector((state: IRootState) => isExpandedUsersSubMenuSelector(state));
  const isExpandedJumpsSubmenu = useSelector((state: IRootState) => isExpandedJumpsSubMenuSelector(state));

  const expandCollapseUsersSubMenu = () => {
    isExpandedUsersSubmenu ? dispatch(collapseUsersSubMenuAction()) : dispatch(expandUsersSubMenuAction());
  };

  const expandCollapseJumpsSubMenu = () => {
    isExpandedJumpsSubmenu ? dispatch(collapseJumpsSubMenuAction()) : dispatch(expandJumpsSubMenuAction());
  };

  const closeLeftMenu = () => {
    dispatch(closeLeftMenuAction());
  };

  const [isDashboardMenuSelected, setDashboardMenuSelected] = useState(false);
  const [isUsersMenuSelected, setUsersMenuSelected] = useState(false);
  const [isJumpsMenuSelected, setJumpsMenuSelected] = useState(false);
  const [isHistoryMenuSelected, setHistoryMenuSelected] = useState(false);
  const [isSettingsMenuSelected, setSettingsMenuSelected] = useState(false);

  useEffect(() => {
    switch (history.location.pathname) {
      case url.users:
      case url.createUser:
      case url.editUser:
        setUsersMenuSelected(true);
        break;
      case url.jumps:
        setJumpsMenuSelected(true);
        break;
      case url.settings:
        setSettingsMenuSelected(true);
        break;
      case url.history:
        setHistoryMenuSelected(true);
        break;
      case url.dashboard:
        setDashboardMenuSelected(true);
        break;
      default:
        break;
    }
  }, [history.location.pathname]);


  const logout = (e: React.MouseEvent) => {
    dispatch(logoutAction());
    localStorage.removeItem('token');
    history.push(url.login);
  };

  return {
    logout,
    isOpenedLeftMenu,
    isExpandedUsersSubmenu,
    isExpandedJumpsSubmenu,
    expandCollapseUsersSubMenu,
    expandCollapseJumpsSubMenu,
    isDashboardMenuSelected,
    isUsersMenuSelected,
    isJumpsMenuSelected,
    isHistoryMenuSelected,
    isSettingsMenuSelected,
    closeLeftMenu,
    history,
  };
};
