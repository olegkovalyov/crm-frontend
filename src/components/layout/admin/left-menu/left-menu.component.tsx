// Core
import React, { FC, ReactElement } from 'react';
import clsx from 'clsx';

// Components
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HistoryIcon from '@material-ui/icons/History';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useRouter } from 'next/router';
import { useStyles } from './left-menu.styles';
import {
  ROUTE_DASHBOARD,
  EVENTS_URL,
  ROUTE_HISTORY,
  MANAGE_INVENTORY_URL,
  ROUTE_SETTINGS,
  USERS_URL, CLIENTS_URL,
} from '../../../../constants/route.constants';
import { UserRole } from '../../../../interfaces/generated/globalTypes';
import { useLeftMenuHandler } from '../../../../hooks/layout/admin/left-menu-handler/left-menu-handler.hook';
import { useCurrentUser } from '../../../../hooks/auth/current-user/current-user.hook';


const LeftMenu: FC = (props): ReactElement => {
  const classes = useStyles();

  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const {
    isOpenedLeftMenu,
    handleCloseLeftMenu,
    handleLogout,
  } = useLeftMenuHandler();

  const usersMenuJsx = (currentUser
    && (currentUser.role.includes(UserRole.ADMIN)
      || currentUser.role.includes(UserRole.MANIFEST)
    )
  ) ?
    <ListItem
      selected={router.pathname.includes(USERS_URL)}
      button
      onClick={() => router.push(USERS_URL)}
    >
      <ListItemIcon>
        <SupervisedUserCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    : '';


  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !isOpenedLeftMenu && classes.drawerPaperClose),
        }}
        open={isOpenedLeftMenu}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleCloseLeftMenu}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem
              selected={router.pathname.includes(ROUTE_DASHBOARD)}
              button
              onClick={() => router.push(ROUTE_DASHBOARD)}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            {usersMenuJsx}
            <ListItem
              selected={router.pathname.includes(EVENTS_URL)}
              button
              onClick={() => router.push(EVENTS_URL)}
            >
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
            <ListItem
              selected={router.pathname.includes(CLIENTS_URL)}
              button
              onClick={() => router.push(CLIENTS_URL)}
            >
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Clients" />
            </ListItem>
            <ListItem
              selected={router.pathname.includes(MANAGE_INVENTORY_URL)}
              button
              onClick={() => router.push(MANAGE_INVENTORY_URL)}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Inventory" />
            </ListItem>
            <ListItem
              selected={router.pathname.includes(ROUTE_HISTORY)}
              button
              onClick={() => router.push(ROUTE_HISTORY)}
            >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItem>
          </div>
        </List>
        <Divider />
        <List>
          <div>
            <ListSubheader />
            <ListItem
              selected={router.pathname.includes(ROUTE_SETTINGS)}
              button
              onClick={() => router.push(ROUTE_SETTINGS)}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem
              button
              onClick={handleLogout}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </div>
        </List>
      </Drawer>
    </>
  );
};

export default LeftMenu;
