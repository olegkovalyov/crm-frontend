import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

interface PropTypesInterface {
  phone: string,
  onPhoneChange: (value: string) => void,
  hasPhoneError: boolean,
  phoneErrorMessage: string,
  formTouched: boolean,
  className?: string,
}

const Phone: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    phone,
    phoneErrorMessage,
    onPhoneChange,
    hasPhoneError,
    formTouched,
  } = props;

  const className = props.className ?? '';

  return (
    <TextField
      className={className}
      value={phone}
      onChange={(e) => onPhoneChange(e.target.value)}
      error={hasPhoneError && formTouched}
      helperText={phoneErrorMessage}
      required
      id="phone"
      name="phone"
      label="Phone"
      fullWidth
      variant='outlined'
    />
  );
});

export default Phone;
