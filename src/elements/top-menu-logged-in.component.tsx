// Core
import React, { FC, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useStyles } from '../components/layout/header/header.styles';
import { SETTINGS_URL } from '../constants/route.constants';

interface PropTypes {
  handleTopMenuOpen: (e: React.MouseEvent) => void,
  handleTopMenuClose: (e: React.MouseEvent) => void,
  handleLogout: (e: React.MouseEvent) => void,
  isTopMenuOpen: boolean,
  anchorEl: Element | ((element: Element) => Element) | null | undefined,
  username: string
  children?: never,
}

export const TopMenuLoggedIn: FC<PropTypes> = (
  {
    handleTopMenuOpen,
    handleTopMenuClose,
    handleLogout,
    isTopMenuOpen,
    anchorEl,
    username
  }: PropTypes,
): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const handleRedirectToSettings = (e: React.MouseEvent) =>
    history.push(SETTINGS_URL);

  return (
    <>
      <Typography className={classes.userName} variant="h6">
        {username}
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
        <MenuItem onClick={handleRedirectToSettings}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
