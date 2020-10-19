import React, { FC, ReactElement } from 'react';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import CreateEventForm from '../../components/events/create-event-form/create-event-form.component';


const CreateEvent: FC = (props): ReactElement => {
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <CreateEventForm />
      </Content>
    </>
  );
};

export default CreateEvent;
