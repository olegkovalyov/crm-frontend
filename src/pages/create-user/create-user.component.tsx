import React, { FC, ReactElement } from 'react';
import Header from '../../components/header/header.component';
import LeftMenu from '../../components/left-menu/left-menu.component';
import { Content } from '../../components/content/content.component';
import CreateUserForm from '../../components/create-user-form/create-user-form.component';


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
