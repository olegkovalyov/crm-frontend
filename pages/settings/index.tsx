import React, { FC, ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ADMIN_LAYOUT } from '../../src/constants/layout.constant';

const Settings: FC = (props): ReactElement => {
  return (
    <>
      Settings
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {

  // Pass data to the page via props
  return {
    props: {
      layout: ADMIN_LAYOUT,
    },
  };
};

export default Settings;

