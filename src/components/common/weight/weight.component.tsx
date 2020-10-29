import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

interface PropTypesInterface {
  weight: string,
  onWeightChange: (value: string) => void,
  hasWeightError: boolean,
  weightErrorMessage: string,
  formTouched: boolean,
  className?: string,
}

const Weight: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    weight,
    onWeightChange,
    hasWeightError,
    weightErrorMessage,
    formTouched,
  } = props;

  const className = props.className ?? '';

  return (
    <TextField
      className={className}
      value={weight}
      onChange={(e) => onWeightChange(e.target.value)}
      error={hasWeightError && formTouched}
      helperText={weightErrorMessage}
      id="weight"
      name=""
      label="Weight"
      fullWidth
      variant='outlined'
    />
  );
});

export default Weight;
