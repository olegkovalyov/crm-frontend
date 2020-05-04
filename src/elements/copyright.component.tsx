// Core
import React, { FC, ReactElement } from 'react';

// Components
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const Copyright: FC = (props): ReactElement => {
  return (
    <>
      <Box pt={4}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href={process.env.REACT_APP_DOMAIN}>
            Skydiving Manager
          </Link>{' '}
          {new Date().getFullYear()}
          .
        </Typography>
      </Box>
    </>
  );
};
