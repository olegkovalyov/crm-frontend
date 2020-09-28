import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import EditUserForm from '../../components/users/edit-user-form/edit-user-form.component';

interface IEditPageParams {
  id: string,
}

const EditUser: FC = (props): ReactElement => {

  const { id } = useParams<IEditPageParams>();
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
