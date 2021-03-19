import React, { FC, ReactElement } from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';

export const TopMenuAnonymousComponent: FC = (props): ReactElement => {
  const router = useRouter();
  return (
    <>
      <Button
        color="inherit"
        onClick={(e) => {
          router.push('/signin');
        }}
      >
        Sign In
      </Button>
      <Button
        color="inherit"
        onClick={(e) => {
          router.push('/signup');
        }}
      >
        Sign Up
      </Button>
    </>
  );
};
