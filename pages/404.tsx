import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { Content } from '../src/components/layout/admin/container/container.component';


const NotFound: FC = (props): ReactElement => {
  return (
    <>
      <Content>
        <Typography variant="h4" component="h4" align='center'>
          Page not found
        </Typography>
      </Content>
    </>
  );
};

export default NotFound;
