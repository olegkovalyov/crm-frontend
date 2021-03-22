import React, { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Content } from '../../src/components/layout/content/content.component';
import { logoutAction } from '../../src/redux/auth/auth.actions';
import { useRouter } from 'next/router';
import { SIGN_IN_URL } from '../../src/constants/route.constants';


const Logout: FC = (props): ReactElement => {

  const dispatch = useDispatch();
  const router = useRouter();
  dispatch(logoutAction());
  router.push(SIGN_IN_URL);
  return <></>
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  // Pass data to the page via props
  return {
    props: {},
  };
};

export default Logout;
