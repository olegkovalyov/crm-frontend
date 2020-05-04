// Core
import React, { FC, ReactElement } from 'react';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

interface IPropTypes {
  show: boolean,
  children?: never,
}

const FormSpinner: FC<IPropTypes> = ({ show }): ReactElement => {
  if (show) {
    return (
      <Grid item xs justify='center' container>
        <CircularProgress />
      </Grid>
    );
  }
  return (<></>);
};

export default FormSpinner;
