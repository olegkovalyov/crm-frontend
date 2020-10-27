import React, { FC, ReactElement } from 'react';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import CreateMemberForm from '../../components/members/create-member-form/create-member-form.component';
import { Content } from '../../components/layout/content/content.component';


const CreateUser: FC = (props): ReactElement => {
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <CreateMemberForm />
      </Content>
    </>
  );
};

export default CreateUser;
