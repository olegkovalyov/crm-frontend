import React, { ReactElement, FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Alert, AlertTitle } from '@material-ui/lab';
import { DialogContent } from '@material-ui/core';

interface PropTypes {
  children?: never,
  handleClose: () => void,
  message: string | null,
  isOpen: boolean,
  btnName: string,
}

const ErrorModal: FC<PropTypes> = (props: PropTypes): ReactElement => {

  const {
    handleClose,
    message,
    isOpen,
    btnName,
  } = props;

  return (
    <div>
      <Dialog
        fullScreen={false}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableBackdropClick={true}
      >
        <DialogContent>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {btnName}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ErrorModal;
