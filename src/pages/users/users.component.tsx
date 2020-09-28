import React, { FC, ReactElement } from 'react';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import UsersTable from '../../components/users/users-table/users-table.component';

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
