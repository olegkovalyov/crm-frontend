import React, { FC, ReactElement } from 'react';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import ClientsTableContainer from '../../components/clients/clients-table-container/clients-table-container.component';

const Clients: FC = (props): ReactElement => {
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <ClientsTableContainer />
      </Content>
    </>
  );
};

export default Clients;
