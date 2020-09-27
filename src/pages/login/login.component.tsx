import React, { FC, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import LogInForm from '../../components/login-form/login-form.component';
import { url } from '../../constants/url';
import { useIsAuthenticated } from '../../hooks/core/is-authenticated/is-authenticated.hook';


const LogIn: FC = (): ReactElement => {
  const { isAuthenticated } = useIsAuthenticated();
  if (isAuthenticated) {
    return (<Redirect to={url.dashboard} />);
  }
  return (
    <>
      <LogInForm />
    </>
  );

};

export default LogIn;
