import React, { FC, ReactElement } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { Gender } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  gender: Gender,
  onGenderChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string,
}

const ClientGenderOptions: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    gender,
    onGenderChange,
  } = props;

  const className = props.className ?? '';

  return (
    <FormControl component="fieldset" className={className}>
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender"
        value={gender}
        onChange={onGenderChange}
      >
        <FormControlLabel
          value={Gender.MALE}
          control={<Radio color='primary' />}
          label="Male"
        />
        <FormControlLabel
          value={Gender.FEMALE}
          control={<Radio color='primary' />}
          label="Female"
        />
      </RadioGroup>
    </FormControl>
  );
});

export default ClientGenderOptions;
