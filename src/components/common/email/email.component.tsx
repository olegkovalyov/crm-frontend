import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

interface PropTypesInterface {
  email: string,
  onEmailChange: (value: string) => void,
  hasEmailError: boolean,
  emailErrorMessage: string,
  formTouched: boolean,
  className?: string,
}

const Email: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    email,
    onEmailChange,
    hasEmailError,
    emailErrorMessage,
    formTouched,
  } = props;

  const className = props.className ?? '';

  return (
    <TextField
      className={className}
      value={email}
      onChange={(e) => onEmailChange(e.target.value)}
      error={hasEmailError && formTouched}
      helperText={emailErrorMessage}
      required
      id="email"
      name="email"
      label="Email"
      fullWidth
      variant='outlined'
    />
  );
});

export default Email;
