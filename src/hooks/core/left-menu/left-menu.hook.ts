import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IRootState } from '../../../redux/root.reducer';
import {
  isExpandedJumpsSubMenuSelector,
  isExpandedUsersSubMenuSelector,
  isOpenedLeftMenuSelector,
} from '../../../redux/ui/ui.selector';
import {
  closeLeftMenuAction,
  collapseJumpsSubMenuAction,
  collapseUsersSubMenuAction,
  expandJumpsSubMenuAction,
  expandUsersSubMenuAction,
} from '../../../redux/ui/ui.actions';
import { useLogoutRequest } from '../../graphql/logout-request/logout-request.hook';
import {
  CREATE_USER_URL, DASHBOARD_URL,
  EDIT_USER_URL, HISTORY_URL,
  JUMPS_URL,
  MANAGE_USERS_URL,
  SETTINGS_URL,
} from '../../../constants/route.constants';

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
      case MANAGE_USERS_URL:
      case CREATE_USER_URL:
      case EDIT_USER_URL:
        setUsersMenuSelected(true);
        break;
      case JUMPS_URL:
        setJumpsMenuSelected(true);
        break;
      case SETTINGS_URL:
        setSettingsMenuSelected(true);
        break;
      case HISTORY_URL:
        setHistoryMenuSelected(true);
        break;
      case DASHBOARD_URL:
        setDashboardMenuSelected(true);
        break;
      default:
        break;
    }

    if (history.location.pathname.includes(EDIT_USER_URL.substring(0, EDIT_USER_URL.length - 3))) {
      setUsersMenuSelected(true);
    }
  }, [history.location.pathname]);

  const { logoutAsync } = useLogoutRequest();

  const logout = (e: React.MouseEvent) => {
    logoutAsync();
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
