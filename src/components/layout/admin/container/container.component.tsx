// Core
import React, { FC, ReactElement } from 'react';

// Components
import { Backdrop, CircularProgress, Container as MaterialUiContainer } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Copyright } from '../../../../elements/copyright.component';
import { useStyles } from './container.styles';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs.component';
import { useSelector } from 'react-redux';
import { RootStateInterface } from '../../../../redux/store';

interface PropTypesInterface {
  children?: ReactElement | string
}

export const Container: FC<PropTypesInterface> = ({ children }: PropTypesInterface): ReactElement => {
  const classes = useStyles();
  const showBackdrop = useSelector((state: RootStateInterface) => state.auth.showBackdrop);

  return (
    <>
      <Backdrop className={classes.backdrop} open={showBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <MaterialUiContainer maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Breadcrumbs />
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {children}
              </Paper>
            </Grid>
          </Grid>
          <Copyright />
        </MaterialUiContainer>
      </main>
    </>
  );
};
