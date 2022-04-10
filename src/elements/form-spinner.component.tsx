// Core
import React, { FC, ReactElement } from 'react';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

interface PropTypesInterface {
  show: boolean,
  children?: never,
}

const FormSpinner: FC<PropTypesInterface> = ({ show }): ReactElement => {
  if (show) {
    return (
      <Grid item xs justifyContent='center' container>
        <CircularProgress />
      </Grid>
    );
  }
  return (<></>);
};

export default FormSpinner;
