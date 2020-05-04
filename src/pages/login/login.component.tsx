import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LogInForm from '../../components/login-form/login-form.component';
import { getCurrentUser } from '../../redux/auth/auth.selector';
import { url } from '../../constants/url';
import { IRootState } from '../../redux/root.reducer';

const LogIn: FC = (props): ReactElement => {
  const isLogged = useSelector((state: IRootState) => getCurrentUser(state));

  if (isLogged) {
    return (
      <Redirect to={url.dashboard} />
    );
  }
  return (
    <>
      <LogInForm />
    </>
  );

};

export default LogIn;
