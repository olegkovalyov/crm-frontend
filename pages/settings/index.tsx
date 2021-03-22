import React, { FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Content } from '../../src/components/layout/content/content.component';
import { handleAccessToken } from '../../src/auth/access-token-handler';


const Settings: FC = (props): ReactElement => {

  const dispatch = useDispatch();

  return (
    <>
      <Content>
        Settings
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {

  // Pass data to the page via props
  return {
    props: {
    },
  };
};

export default Settings;

