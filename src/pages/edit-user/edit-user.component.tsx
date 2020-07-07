import React, { FC, ReactElement } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../../components/header/header.component';
import LeftMenu from '../../components/left-menu/left-menu.component';
import { Content } from '../../components/content/content.component';
import EditUserForm from '../../components/edit-user-form/edit-user-form.component';
import { url } from '../../constants/url';


const EditUser: FC = (props): ReactElement => {

  const history = useHistory();
  const { id } = useParams();
  if (id === undefined) {
    history.push(url.users);
  }

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
