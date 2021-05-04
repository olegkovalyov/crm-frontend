import React, { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Content } from '../../../src/components/layout/content/content.component';

const Event: FC = (props): ReactElement => {

  const dispatch = useDispatch();

  return (
    <>
      <Content>
        Event
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

export default Event;

