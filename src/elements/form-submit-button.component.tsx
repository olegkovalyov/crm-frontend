// Core
import React, { FC, ReactElement } from 'react';
import Button from '@material-ui/core/Button';

interface IPropTypes {
  title: string,
  show: boolean,
  disabled: boolean,
  className: string
  children?: never,
  onClick: (e: React.MouseEvent) => void,
}

const FormSubmitButton: FC<IPropTypes> = ({ title, show, disabled, className, onClick }): ReactElement => {

  if (show) {
    return (
      <Button
        onClick={onClick}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={disabled}
        className={className}
      >
        {title}
      </Button>
    );
  }
  return (<></>);
};

export default FormSubmitButton;
