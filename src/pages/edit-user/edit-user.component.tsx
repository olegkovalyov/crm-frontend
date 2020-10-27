import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import EditMemberForm from '../../components/members/edit-member-form/edit-member-form.component';

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
        <EditMemberForm id={id!} />
      </Content>
    </>
  );
};

export default EditUser;
