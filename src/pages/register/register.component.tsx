import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from '../../redux/auth/auth.selector';
import { url } from '../../constants/url';
import { IRootState } from '../../redux/root.reducer';
import RegisterForm from '../../components/register-form/register-form.component';

const Register: FC = (props): ReactElement => {
  const isLogged = useSelector((state: IRootState) => getCurrentUser(state));

  console.log(isLogged);
  if (isLogged) {
    return (
      <Redirect to={url.dashboard} />
    );
  }
  return (
    <>
      <RegisterForm />
    </>
  );

};

export default Register;
