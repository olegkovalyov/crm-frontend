// Core
import React, { FC, ReactElement } from 'react';

// Components
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Copyright } from '../../elements/copyright.component';
import { useStyles } from './content.styles';
import { SimpleBreadcrumbs } from '../breadcrumbs/breadcrumbs.component';

interface IPropTypes {
  children?: ReactElement | string
}

export const Content: FC<IPropTypes> = ({ children }: IPropTypes): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SimpleBreadcrumbs />
              <Paper className={classes.paper}>
                {children}
              </Paper>
            </Grid>
          </Grid>
          <Copyright />
        </Container>
      </main>
    </>
  );
};
