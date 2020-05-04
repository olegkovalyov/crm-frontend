import React, { FC, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export const TopMenuAnonymousComponent: FC = (props): ReactElement => {
  const history = useHistory();
  return (
    <>
      <Button
        color="inherit"
        onClick={(e) => {
          history.push('/signin');
        }}
      >
        Sign In
      </Button>
      <Button
        color="inherit"
        onClick={(e) => {
          history.push('/signup');
        }}
      >
        Sign Up
      </Button>
    </>
  );
};
