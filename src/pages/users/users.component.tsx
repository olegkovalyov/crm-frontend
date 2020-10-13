import React, { FC, ReactElement } from 'react';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import UsersTableContainer from '../../components/users/users-table-container/users-table-container.component';

const Users: FC = (props): ReactElement => {

  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <UsersTableContainer />
      </Content>
    </>
  );
};

export default Users;
