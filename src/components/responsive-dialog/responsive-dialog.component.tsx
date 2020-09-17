import React, { ReactElement, FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormSpinner from '../../elements/form-spinner.component';

interface PropTypes {
  children?: never,
  handleClose: () => void,
  handleConfirm: () => void,
  handleCancel: () => void,
  confirmButtonText: string,
  cancelButtonText: string,
  title: string,
  isOpen: boolean,
  isFullScreen: boolean,
  inProcess: boolean,
}

const ResponsiveDialog: FC<PropTypes> = (props: PropTypes): ReactElement => {

  const {
    handleClose,
    handleConfirm,
    handleCancel,
    confirmButtonText,
    cancelButtonText,
    title,
    isOpen,
    isFullScreen,
    inProcess,
  } = props;

  const dialogActionsJsx = inProcess ?
    <DialogActions><FormSpinner show={true} /></DialogActions> :
    <DialogActions>
      <Button onClick={handleCancel} color="secondary" autoFocus>
        {cancelButtonText}
      </Button>
      <Button onClick={handleConfirm} color="primary" autoFocus>
        {confirmButtonText}
      </Button>
    </DialogActions>;

  return (
    <div>
      <Dialog
        fullScreen={isFullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableBackdropClick={true}
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        {dialogActionsJsx}
      </Dialog>
    </div>
  );
};

export default ResponsiveDialog;
