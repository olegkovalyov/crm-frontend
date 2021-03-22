import React, { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { Content } from '../../src/components/layout/content/content.component';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';


const History: FC = (props): ReactElement => {

  const dispatch = useDispatch();

  return (
    <>
      <Content>
        History
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
  // Pass data to the page via props
  return {
    props: {},
  };
};

export default History;

