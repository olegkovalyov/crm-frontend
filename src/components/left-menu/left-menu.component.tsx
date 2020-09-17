// Core
import React, { FC, ReactElement } from 'react';
import clsx from 'clsx';

// Components
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HistoryIcon from '@material-ui/icons/History';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
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
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useStyles } from './left-menu.styles';
import { url } from '../../constants/url';
import { useLeftMenu } from '../../hooks/left-menu/left-menu.hook';


const LeftMenu: FC = (props): ReactElement => {
  const classes = useStyles();
  const {
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
              onClick={() => history.push(url.dashboard)}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              onClick={expandCollapseUsersSubMenu}
            >
              <ListItemIcon>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
              {isExpandedUsersSubmenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isExpandedUsersSubmenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  selected={isUsersMenuSelected}
                  button
                  className={classes.nested}
                  onClick={() => history.push(url.users)}
                >
                  <ListItemIcon>
                    <PermContactCalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <HowToRegIcon />
                  </ListItemIcon>
                  <ListItemText primary="Roles" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={expandCollapseJumpsSubMenu}>
              <ListItemIcon>
                <AirplanemodeActiveIcon />
              </ListItemIcon>
              <ListItemText primary="Jumps" />
              {isExpandedJumpsSubmenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isExpandedJumpsSubmenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  selected={isJumpsMenuSelected}
                  button
                  className={classes.nested}
                  onClick={() => history.push(url.jumps)}
                >
                  <ListItemIcon>
                    <EventAvailableIcon />
                  </ListItemIcon>
                  <ListItemText primary="Manage" />
                </ListItem>
                <ListItem
                  selected={isHistoryMenuSelected}
                  button
                  className={classes.nested}
                  onClick={() => history.push(url.history)}
                >
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="History" />
                </ListItem>
              </List>
            </Collapse>
          </div>
        </List>
        <Divider />
        <List>
          <div>
            <ListSubheader />
            <ListItem
              selected={isSettingsMenuSelected}
              button
              onClick={() => history.push(url.settings)}
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
