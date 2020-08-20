// Core
import React, { FC, ReactElement } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Components
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
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
import { isOpenedLeftMenuSelector } from '../../redux/ui/ui.selector';
import { IRootState } from '../../redux/root.reducer';
import { closeLeftMenu } from '../../redux/ui/ui.actions';
import { useStyles } from './left-menu.styles';
import { url } from '../../constants/url';
import { logoutAction } from '../../redux/auth/auth.actions';


const LeftMenu: FC = (props): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const isOpenedLeftMenu = useSelector((state: IRootState) => isOpenedLeftMenuSelector(state));
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const logout = (e: React.MouseEvent) => {
    dispatch(logoutAction());
    localStorage.removeItem('token');
    history.push(url.login);
  };


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
          <IconButton onClick={() => {
            dispatch(closeLeftMenu());
          }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem
              button
              onClick={() => history.push(url.dashboard)}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
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
          </div>
        </List>
        <Divider />
        <List>
          <div>
            <ListSubheader />
            <ListItem
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
