import React, { FC, ReactElement } from 'react';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import CreateUserForm from '../../components/users/create-user-form/create-user-form.component';
import { Content } from '../../components/layout/content/content.component';


const CreateUser: FC = (props): ReactElement => {
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <CreateUserForm />
      </Content>
    </>
  );
};

export default CreateUser;
