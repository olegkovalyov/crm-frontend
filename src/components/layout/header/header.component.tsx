// Core
import React, { FC, ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

// Components
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './header.styles';

// Selectors
import { isOpenedLeftMenuSelector, isOpenedTopMenuSelector } from '../../../redux/ui/ui.selector';
import { IRootState } from '../../../redux/root.reducer';
import { closeTopMenuAction, openLeftMenuAction, openTopMenuAction } from '../../../redux/ui/ui.actions';
import { TopMenuAnonymousComponent } from '../../../elements/top-menu-anonymous.component';
import { TopMenuLoggedIn } from '../../../elements/top-menu-logged-in.component';
import { getCurrentUser } from '../../../redux/auth/auth.selector';
import { logoutAction } from '../../../redux/auth/auth.actions';
import { LOGIN_URL } from '../../../constants/route.constants';

const Header: FC = (props): ReactElement => {
  const classes: Record<string, string> = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isOpenedLeftMenu: boolean = useSelector((state: IRootState) => isOpenedLeftMenuSelector(state));

  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);

  const isTopMenuOpen = useSelector((state: IRootState) => isOpenedTopMenuSelector(state)); // Boolean(anchorEl);
  const currentUser = useSelector((state: IRootState) => getCurrentUser(state));

  const handleTopMenuOpen = (e: React.MouseEvent) => {
    dispatch(openTopMenuAction());
    setAnchorEl(e.currentTarget);
  };

  const handleLogout = (e: React.MouseEvent) => {
    setAnchorEl(null);
    dispatch(closeTopMenuAction());
    dispatch(logoutAction());
    history.push(LOGIN_URL);
  };

  const handleTopMenuClose = (e: React.MouseEvent) => {
    dispatch(closeTopMenuAction());
    setAnchorEl(null);
  };

  const topMenuJSX = currentUser ? <TopMenuLoggedIn
    handleLogout={handleLogout}
    handleTopMenuClose={handleTopMenuClose}
    handleTopMenuOpen={handleTopMenuOpen}
    anchorEl={anchorEl}
    isTopMenuOpen={isTopMenuOpen}
    username={`${currentUser.firstName} ${currentUser.lastName}`}
  /> : <TopMenuAnonymousComponent />;


  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, isOpenedLeftMenu && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={(e: React.MouseEvent) => dispatch(openLeftMenuAction())}
            className={clsx(classes.menuButton, isOpenedLeftMenu && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            onClick={(e: React.MouseEvent) => {
              history.push('/');
            }}
          >
            Skydive CRM
          </Typography>
          {topMenuJSX}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;