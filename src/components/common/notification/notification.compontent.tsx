import React, { FC, ReactElement, useEffect } from 'react';
import { Button, Snackbar, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

interface PropTypesInterface {
  hasNotification: boolean,
  message: string,
  type: 'success' | 'error',
  autoHide?: boolean,
  buttonTitle?: string,
  buttonHandler?: (e: React.MouseEvent) => void
}

const Notification: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const { hasNotification, message, type, autoHide, buttonTitle, buttonHandler } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = (event) => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (hasNotification) {
      setIsOpen(true);
    }
  }, [hasNotification]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHide ? 6000 : null}
      onClose={handleClose}
    >
      <Alert
        severity={type}
        onClose={handleClose}
      >
        {message}
        {buttonTitle ?
          <Button
            onClick={buttonHandler}
            color='primary'
          >
            {buttonTitle}
          </Button> :
          ''}
      </Alert>
    </Snackbar>
  );
});

export default Notification;
