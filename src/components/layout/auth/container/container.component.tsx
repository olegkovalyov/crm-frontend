// Core
import React, { FC, ReactElement } from 'react';

// Components
import { Container as MaterialUiContainer } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { Copyright } from '../../../../elements/copyright.component';
import { useStyles } from './container.styles';

interface PropTypesInterface {
  children?: ReactElement | string
}

export const Container: FC<PropTypesInterface> = ({ children }: PropTypesInterface): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <MaterialUiContainer maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          {children}
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </MaterialUiContainer>
    </>
  );
};
