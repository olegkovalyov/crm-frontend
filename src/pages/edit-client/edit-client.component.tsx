import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import EditClientForm from '../../components/clients/edit-client-form/edit-client-form.component';

interface EditPageParamsInterface {
  id: string,
}

const EditClient: FC = (props): ReactElement => {

  const { id } = useParams<EditPageParamsInterface>();
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <EditClientForm id={id!} />
      </Content>
    </>
  );
};

export default EditClient;
