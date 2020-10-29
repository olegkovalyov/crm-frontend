import React, { FC, ReactElement } from 'react';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import CreateClientForm from '../../components/clients/create-client-form/create-client-form.component';


const CreateClient: FC = (props): ReactElement => {
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <CreateClientForm />
      </Content>
    </>
  );
};

export default CreateClient;
