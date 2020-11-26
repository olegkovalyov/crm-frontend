import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@material-ui/core';
import { LoadInterface } from '../../../interfaces/load.interface';


interface IPropTypes {
  load: LoadInterface,
}

const SingleLoad: FC<IPropTypes> = (props: IPropTypes): ReactElement => {
  const { load } = props;

  return (
    <>
      <Box p={3}>
        <Typography>Here will be content of load {load.id}</Typography>
      </Box>
    </>
  );
};

export default SingleLoad;
