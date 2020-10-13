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
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { useStyles } from './left-menu.styles';
import { useLeftMenu } from '../../../hooks/core/left-menu/left-menu.hook';
import {
  DASHBOARD_URL,
  HISTORY_URL,
  EVENTS_URL,
  MANAGE_USERS_URL,
  SETTINGS_URL,
  MANAGE_INVENTORY_URL,
} from '../../../constants/route.constants';


const LeftMenu: FC = (props): ReactElement => {
  const classes = useStyles();
  const {
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
  } = useLeftMenu();


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
          <IconButton onClick={closeLeftMenu}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem
              selected={isDashboardMenuSelected}
              button
              onClick={() => history.push(DASHBOARD_URL)}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              selected={isManageUsersMenuSelected}
              button
              onClick={() => history.push(MANAGE_USERS_URL)}
            >
              <ListItemIcon>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem
              selected={isManageInventoryMenuSelected}
              button
              onClick={() => history.push(MANAGE_INVENTORY_URL)}
            >
              <ListItemIcon>
                <HowToRegIcon />
              </ListItemIcon>
              <ListItemText primary="Inventory" />
            </ListItem>
            <ListItem
              selected={isEventsMenuSelected}
              button
              onClick={() => history.push(EVENTS_URL)}
            >
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
            <ListItem
              selected={isHistoryMenuSelected}
              button
              onClick={() => history.push(HISTORY_URL)}
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
              selected={isSettingsMenuSelected}
              button
              onClick={() => history.push(SETTINGS_URL)}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem
              button
              onClick={logout}
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
