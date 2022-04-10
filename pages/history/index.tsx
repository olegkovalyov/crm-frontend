import React, { FC, ReactElement } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ADMIN_LAYOUT } from '../../src/constants/layout.constant';

const History: FC = (props): ReactElement => {
  return (
    <>
      History
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

export default History;

