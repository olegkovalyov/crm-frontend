import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

interface PropTypesInterface {
  age: string,
  onAgeChange: (value: string) => void,
  hasAgeError: boolean,
  ageErrorMessage: string,
  formTouched: boolean,
  className?: string,
}

const Age: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    age,
    onAgeChange,
    hasAgeError,
    ageErrorMessage,
    formTouched,
  } = props;

  const className = props.className ?? '';

  return (
    <TextField
      className={className}
      value={age}
      onChange={(e) => onAgeChange(e.target.value)}
      error={hasAgeError && formTouched}
      helperText={ageErrorMessage}
      id="age"
      name="age"
      label="Age"
      fullWidth
      variant='outlined'
    />
  );
});

export default Age;
