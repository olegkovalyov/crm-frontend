import React, { FC, ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ADMIN_LAYOUT } from '../../src/constants/layout.constant';


const Dashboard: FC = (props): ReactElement => {

  return (
    <>
      Dashboard
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  return {
    props: {
      layout: ADMIN_LAYOUT,
    },
  };
};

export default Dashboard;
