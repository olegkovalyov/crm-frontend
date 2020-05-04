import React, { FC, ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import Header from '../../components/header/header.component';
import LeftMenu from '../../components/left-menu/left-menu.component';
import { Content } from '../../components/content/content.component';

const NotFound: FC = (props): ReactElement => {
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <Typography variant="h2" component="h2">
          Not found.
        </Typography>
      </Content>
    </>
  );
};

export default NotFound;
