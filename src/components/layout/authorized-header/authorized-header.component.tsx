// Core
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import clsx from 'clsx';

// Components
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { AccountCircle } from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from './autrorized-header.styles';

// Selectors
import { isOpenedLeftMenuSelector, isOpenedTopMenuSelector } from '../../../redux/ui/ui.selector';
import { RootStateInterface } from '../../../redux/root.reducer';
import { closeTopMenuAction, openLeftMenuAction, openTopMenuAction } from '../../../redux/ui/ui.actions';
import { SIGN_IN_URL, SETTINGS_URL } from '../../../constants/route.constants';
import { UserInterface } from '../../../interfaces/auth.interface';
import { useLogoutQuery } from '../../../hooks/graphql/queries/logout/logout.query.hook';

interface PropTypesInterface {
  user: UserInterface;
}

const AuthorizedHeader: FC<PropTypesInterface> = (props: PropTypesInterface): ReactElement => {
  const { user } = props;
  const classes: Record<string, string> = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const { handleLogout, logoutData } = useLogoutQuery();

  const isOpenedLeftMenu: boolean = useSelector((state: RootStateInterface) => isOpenedLeftMenuSelector(state));

  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
  const [openGlobalBackdrop, setOpenGlobalBackdrop] = React.useState(false);

  const isTopMenuOpen = useSelector((state: RootStateInterface) => isOpenedTopMenuSelector(state)); // Boolean(anchorEl);

  const handleTopMenuOpen = (e: React.MouseEvent) => {
    dispatch(openTopMenuAction());
    setAnchorEl(e.currentTarget);
  };

  const logoutHandler = (e: React.MouseEvent) => {
    console.log('Logout now');
    handleLogout();
    setOpenGlobalBackdrop(true);
    setAnchorEl(null);
    dispatch(closeTopMenuAction());
  };

  useEffect(() => {
    if (logoutData
      && logoutData.logout === true
    ) {
      router.push(SIGN_IN_URL);
      setOpenGlobalBackdrop(false);
    }
  }, [logoutData]);

  const handleTopMenuClose = (e: React.MouseEvent) => {
    dispatch(closeTopMenuAction());
    setAnchorEl(null);
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={openGlobalBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
              router.push('/');
            }}
          >
            Skydive CRM
          </Typography>
          <Typography className={classes.userName} variant="h6">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <IconButton
            className={classes.topMenuIcon}
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleTopMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isTopMenuOpen}
            onClose={handleTopMenuClose}
          >
            <MenuItem onClick={() => router.push(SETTINGS_URL)}>Settings</MenuItem>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  )
    ;
};

export default AuthorizedHeader;
