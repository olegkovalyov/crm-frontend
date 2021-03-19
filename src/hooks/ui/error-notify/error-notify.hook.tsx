import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';


export const useErrorNotify = (
  errorMessage: string | null,
  closeButtonName: string
) => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key: string) => {
    return <Button
      color='inherit'
      onClick={(e) => {
        closeSnackbar(key);
      }}
    >
      {closeButtonName}
    </Button>;
  };

  useEffect(() => {
    if (errorMessage && errorMessage.length) {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        preventDuplicate: true,
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'bottom',
        },
        action,
      });
    }
  }, [errorMessage]);

};
