import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

interface PropTypesInterface {
  lastName: string,
  onLastNameChange: (value: string) => void,
  hasLastNameError: boolean,
  lastNameErrorMessage: string,
  formTouched: boolean,
  className?: string,
}

const LastName: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    lastName,
    hasLastNameError,
    onLastNameChange,
    lastNameErrorMessage,
    formTouched,
  } = props;

  const className = props.className ?? '';

  return (
    <TextField
      className={className}
      value={lastName}
      onChange={(e) => onLastNameChange(e.target.value)}
      error={hasLastNameError && formTouched}
      helperText={lastNameErrorMessage}
      required
      id="lastName"
      name="lastName"
      label="Last Name"
      fullWidth
      variant='outlined'
    />
  );
});

export default LastName;
