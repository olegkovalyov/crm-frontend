import React, { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import LoadsContainer from '../../components/loads/loads-container/loads-container.component';

interface IEditPageParams {
  eventId: string,
}

const Loads: FC = (props): ReactElement => {
  const { eventId } = useParams<IEditPageParams>();
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <LoadsContainer eventId={eventId} />
      </Content>
    </>
  );
};

export default Loads;
