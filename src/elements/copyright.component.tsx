// Core
import React, { FC, ReactElement } from 'react';

// Components
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from 'next/link';

export const Copyright: FC = (props): ReactElement => {
  return (
    <>
      <Box pt={4}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link href='http://test.com'>
            Skydiving Manager
          </Link>{' '}
          {new Date().getFullYear()}
          .
        </Typography>
      </Box>
    </>
  );
};
