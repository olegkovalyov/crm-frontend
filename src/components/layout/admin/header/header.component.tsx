// Core
import React, { FC, ReactElement } from 'react';
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
import { useStyles } from './header.styles';

// Selectors
import { ROUTE_SETTINGS } from '../../../../constants/route.constants';
import { useTopMenuHandler } from '../../../../hooks/layout/admin/top-menu-handler/top-menu-handler.hook';
import { useCurrentUser } from '../../../../hooks/auth/current-user/current-user.hook';


const AuthorizedHeader: FC = (props): ReactElement => {
  const classes = useStyles();
  const router = useRouter();

  const { currentUser } = useCurrentUser();

  const {
    anchorEl,
    isOpenedLeftMenu,
    isOpenedTopMenu,
    handleOpenTopMenu,
    handleCloseTopMenu,
    handleOpenLeftMenu,
    handleLogout,
  } = useTopMenuHandler();


  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, isOpenedLeftMenu && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpenLeftMenu}
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
            {`${currentUser.firstName} ${currentUser.lastName}`}
          </Typography>
          <IconButton
            className={classes.topMenuIcon}
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOpenTopMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isOpenedTopMenu}
            onClose={handleCloseTopMenu}
          >
            <MenuItem onClick={() => router.push(ROUTE_SETTINGS)}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  )
    ;
};

export default AuthorizedHeader;
