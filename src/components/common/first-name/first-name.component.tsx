import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

interface PropTypesInterface {
  firstName: string,
  onFirstNameChange: (value: string) => void,
  hasFirstNameError: boolean,
  firstNameErrorMessage: string,
  formTouched: boolean,
  className?: string,
}

const FirstName: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    firstName,
    hasFirstNameError,
    onFirstNameChange,
    firstNameErrorMessage,
    formTouched,
  } = props;

  const className = props.className ?? '';

  return (
    <TextField
      className={className}
      value={firstName}
      onChange={(e) => onFirstNameChange(e.target.value)}
      error={hasFirstNameError && formTouched}
      helperText={firstNameErrorMessage}
      required
      id="firstName"
      name="firstName"
      label="First Name"
      fullWidth
      variant='outlined'
    />
  );
});

export default FirstName;
