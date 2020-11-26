import React, { FC, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/layout/header/header.component';
import LeftMenu from '../../components/layout/left-menu/left-menu.component';
import { Content } from '../../components/layout/content/content.component';
import { RootStateInterface } from '../../redux/root.reducer';
import { getRedirectUrl } from '../../redux/auth/auth.selector';
import { setRedirectUrlAction } from '../../redux/auth/auth.actions';

const Dashboard: FC = (props): ReactElement => {

  const dispatch = useDispatch();
  const redirectUrl = useSelector((state: RootStateInterface) => getRedirectUrl(state));
  if (redirectUrl) {
    dispatch(setRedirectUrlAction(null));
    return <Redirect to={redirectUrl} />;
  }

  return (
    <>
      <Header />
      <LeftMenu />
      <Content>
        Dashboard
      </Content>
    </>
  );
};

export default Dashboard;
