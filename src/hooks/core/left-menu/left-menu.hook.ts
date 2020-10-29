import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useHistory } from 'react-router-dom';
import { RootStateInterface } from '../../../redux/root.reducer';
import { isOpenedLeftMenuSelector } from '../../../redux/ui/ui.selector';
import { closeLeftMenuAction } from '../../../redux/ui/ui.actions';
import { useLogoutQuery } from '../../graphql/queries/logout/logout.query.hook';
import {
  CLIENTS_URL, CREATE_CLIENT_URL,
  CREATE_EVENT_URL,
  CREATE_MEMBER_URL,
  DASHBOARD_URL, EDIT_CLIENT_URL,
  EDIT_EVENT_URL,
  EDIT_MEMBER_URL,
  EVENTS_URL,
  HISTORY_URL,
  LOADS_URL,
  MANAGE_INVENTORY_URL,
  MEMBERS_URL,
  NO_MATCH_URL,
  routePaths,
  SETTINGS_URL,
} from '../../../constants/route.constants';

export const useLeftMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isOpenedLeftMenu = useSelector((state: RootStateInterface) => isOpenedLeftMenuSelector(state));

  const closeLeftMenu = () => {
    dispatch(closeLeftMenuAction());
  };

  const [isDashboardMenuSelected, setDashboardMenuSelected] = useState(false);
  const [isManageMembersMenuSelected, setManageMembersMenuSelected] = useState(false);
  const [isManageInventoryMenuSelected, setManageInventoryMenuSelected] = useState(false);
  const [isEventsMenuSelected, setEventsMenuSelected] = useState(false);
  const [isClientsMenuSelected, setClientsMenuSelected] = useState(false);
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
          case MEMBERS_URL:
          case CREATE_MEMBER_URL:
          case EDIT_MEMBER_URL:
            setManageMembersMenuSelected(true);
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
          case CLIENTS_URL:
          case CREATE_CLIENT_URL:
          case EDIT_CLIENT_URL:
            setClientsMenuSelected(true);
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
  }, [history.location.pathname]); // eslint-disable-line

  const { logoutAsync } = useLogoutQuery();

  const logout = (e: React.MouseEvent) => {
    logoutAsync();
  };

  return {
    logout,
    isOpenedLeftMenu,
    isDashboardMenuSelected,
    isManageMembersMenuSelected,
    isManageInventoryMenuSelected,
    isEventsMenuSelected,
    isClientsMenuSelected,
    isHistoryMenuSelected,
    isSettingsMenuSelected,
    closeLeftMenu,
    history,
  };
};
