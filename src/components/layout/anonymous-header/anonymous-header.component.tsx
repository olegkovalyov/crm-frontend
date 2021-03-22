// Core
import React, { FC, ReactElement } from 'react';
import { useRouter } from 'next/router';

// Components
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { SIGN_IN_URL, SIGN_UP_URL } from '../../../constants/route.constants';
import { useStyles } from './anonymous-header.styles';

const AnonymousHeader: FC = (props): ReactElement => {
  const classes: Record<string, string> = useStyles();
  const router = useRouter();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
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
          <Button
            color="inherit"
            onClick={(e) => {
              router.push(SIGN_IN_URL);
            }}
          >
            Sign In
          </Button>
          <Button
            color="inherit"
            onClick={(e) => {
              router.push(SIGN_UP_URL);
            }}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      </div>
    </>
  )
    ;
};

export default AnonymousHeader;
