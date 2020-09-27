import React, { FC, ReactElement } from 'react';
import Header from '../../components/header/header.component';
import LeftMenu from '../../components/left-menu/left-menu.component';
import { Content } from '../../components/content/content.component';
import UsersTable from '../../components/users-table/users-table.component';

const Users: FC = (props): ReactElement => {

  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <UsersTable />
      </Content>
    </>
  );
};

export default Users;
