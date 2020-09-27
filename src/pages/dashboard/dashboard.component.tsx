import React, { FC, ReactElement } from 'react';
import Header from '../../components/header/header.component';
import LeftMenu from '../../components/left-menu/left-menu.component';
import { Content } from '../../components/content/content.component';

const Dashboard: FC = (props): ReactElement => {

  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        Dashboard
      </Content>
    </>
  );
};

export default Dashboard;
