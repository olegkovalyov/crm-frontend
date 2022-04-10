import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

interface PropTypesInterface {
  address: string,
  onAddressChange: (value: string) => void,
  hasAddressError: boolean,
  addressErrorMessage: string,
  formTouched: boolean,
  className?: string,
}

const Address: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    address,
    onAddressChange,
    hasAddressError,
    addressErrorMessage,
    formTouched,
  } = props;

  const className = props.className ?? '';

  return (
    <TextField
      className={className}
      value={address}
      onChange={(e) => onAddressChange(e.target.value)}
      error={hasAddressError && formTouched}
      helperText={addressErrorMessage}
      required
      id="address"
      name="address"
      label="Address"
      fullWidth
      variant='outlined'
    />
  );
});

export default Address;
