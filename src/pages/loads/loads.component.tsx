import React, { FC, ReactElement } from 'react';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import LoadsTableContainer from '../../components/loads/loads-table-container/loads-table-container.component';

const Loads: FC = (props): ReactElement => {
  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        <LoadsTableContainer />
      </Content>
    </>
  );
};

export default Loads;
