import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, matchPath } from 'react-router-dom';
import { IRootState } from '../../../redux/root.reducer';
import {
  isOpenedLeftMenuSelector,
} from '../../../redux/ui/ui.selector';
import {
  closeLeftMenuAction,
} from '../../../redux/ui/ui.actions';
import { useLogoutQuery } from '../../graphql/queries/logout/logout.query.hook';
import {
  CREATE_USER_URL, DASHBOARD_URL,
  EDIT_USER_URL, HISTORY_URL,
  EVENTS_URL,
  USERS_URL,
  SETTINGS_URL, MANAGE_INVENTORY_URL, NO_MATCH_URL, CREATE_EVENT_URL, EDIT_EVENT_URL, LOADS_URL, routePaths,
} from '../../../constants/route.constants';

export const useLeftMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isOpenedLeftMenu = useSelector((state: IRootState) => isOpenedLeftMenuSelector(state));

  const closeLeftMenu = () => {
    dispatch(closeLeftMenuAction());
  };

  const [isDashboardMenuSelected, setDashboardMenuSelected] = useState(false);
  const [isManageUsersMenuSelected, setManageUsersMenuSelected] = useState(false);
  const [isManageInventoryMenuSelected, setManageInventoryMenuSelected] = useState(false);
  const [isEventsMenuSelected, setEventsMenuSelected] = useState(false);
  const [isHistoryMenuSelected, setHistoryMenuSelected] = useState(false);
  const [isSettingsMenuSelected, setSettingsMenuSelected] = useState(false);

  useEffect(() => {
    routePaths.forEach(path => {
      if (path !== NO_MATCH_URL
        && matchPath(history.location.pathname, {
          path,
          exact: true,
        })) {
        switch (path) {
          case USERS_URL:
          case CREATE_USER_URL:
          case EDIT_USER_URL:
            setManageUsersMenuSelected(true);
            break;
          case MANAGE_INVENTORY_URL:
            setManageInventoryMenuSelected(true);
            break;
          case EVENTS_URL:
          case CREATE_EVENT_URL:
          case EDIT_EVENT_URL:
          case LOADS_URL:
            setEventsMenuSelected(true);
            break;
          case HISTORY_URL:
            setHistoryMenuSelected(true);
            break;
          case SETTINGS_URL:
            setSettingsMenuSelected(true);
            break;
          case DASHBOARD_URL:
            setDashboardMenuSelected(true);
            break;
          default:
            break;
        }
      }
    });
  }, [history.location.pathname]);

  const { logoutAsync } = useLogoutQuery();

  const logout = (e: React.MouseEvent) => {
    logoutAsync();
  };

  return {
    logout,
    isOpenedLeftMenu,
    isDashboardMenuSelected,
    isManageUsersMenuSelected,
    isManageInventoryMenuSelected,
    isEventsMenuSelected,
    isHistoryMenuSelected,
    isSettingsMenuSelected,
    closeLeftMenu,
    history,
  };
};
