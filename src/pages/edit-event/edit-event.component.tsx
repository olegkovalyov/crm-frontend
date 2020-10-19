import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import EditEventForm from '../../components/events/edit-event-form/edit-event-form.component';

interface IEditPageParams {
  id: string,
}

const EditEvent: FC = (props): ReactElement => {

  const { id } = useParams<IEditPageParams>();
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <EditEventForm id={id} />
      </Content>
    </>
  );
};

export default EditEvent;
