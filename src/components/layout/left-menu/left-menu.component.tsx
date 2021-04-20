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
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useStyles } from './left-menu.styles';
import { useLeftMenu } from '../../../hooks/layout/left-menu/left-menu.hook';
import {
  DASHBOARD_URL,
  EVENTS_URL,
  HISTORY_URL,
  MANAGE_INVENTORY_URL,
  SETTINGS_URL,
  MEMBERS_URL, CLIENTS_URL,
} from '../../../constants/route.constants';
import { RootStateInterface } from '../../../redux/root.reducer';
import { getCurrentUser } from '../../../redux/auth/auth.selector';
import { MemberRole } from '../../../interfaces/generated/globalTypes';


const LeftMenu: FC = (props): ReactElement => {
  const classes = useStyles();

  const currentUser = useSelector((state: RootStateInterface) => getCurrentUser(state));
  const router = useRouter();

  const {
    logout,
    isOpenedLeftMenu,
    closeLeftMenu,
  } = useLeftMenu();

  const usersMenuJsx = (currentUser
    && (currentUser.roles.includes(MemberRole.ADMIN)
      || currentUser.roles.includes(MemberRole.MANIFEST)
    )
  ) ?
    <ListItem
      selected={router.pathname.includes(MEMBERS_URL)}
      button
      onClick={() => router.push(MEMBERS_URL)}
    >
      <ListItemIcon>
        <SupervisedUserCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Members" />
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
          <IconButton onClick={closeLeftMenu}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem
              selected={router.pathname.includes(DASHBOARD_URL)}
              button
              onClick={() => router.push(DASHBOARD_URL)}
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
              selected={router.pathname.includes(HISTORY_URL)}
              button
              onClick={() => router.push(HISTORY_URL)}
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
              selected={router.pathname.includes(SETTINGS_URL)}
              button
              onClick={() => router.push(SETTINGS_URL)}
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
