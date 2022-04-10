// Core
import React, { FC, ReactElement } from 'react';
import { useRouter } from 'next/router';

// Components
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ROUTE_LOG_IN, ROUTE_REGISTER } from '../../../../constants/route.constants';
import { useStyles } from './header.styles';

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
              router.push(ROUTE_LOG_IN);
            }}
          >
            LogIn
          </Button>
          <Button
            color="inherit"
            onClick={(e) => {
              router.push(ROUTE_REGISTER);
            }}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>
      </div>
    </>
  )
    ;
};

export default AnonymousHeader;
