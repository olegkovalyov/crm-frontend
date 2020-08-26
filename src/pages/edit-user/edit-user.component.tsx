import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header.component';
import LeftMenu from '../../components/left-menu/left-menu.component';
import { Content } from '../../components/content/content.component';
import EditUserForm from '../../components/edit-user-form/edit-user-form.component';


const EditUser: FC = (props): ReactElement => {

  const { id } = useParams();
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <EditUserForm id={id!} />
      </Content>
    </>
  );
};

export default EditUser;
