import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { Content } from '../../components/content/content.component';

const NotFound: FC = (props): ReactElement => {
  return (
    <>
      <Content>
        <Typography variant="h2" component="h2">
          Not found.
        </Typography>
      </Content>
    </>
  );
};

export default NotFound;
