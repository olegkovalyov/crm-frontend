import React, { FC, ReactElement } from 'react';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { ClientType } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  clientType: ClientType,
  onClientTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string,
}

const ClientEventOptions: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    clientType,
    onClientTypeChange,
  } = props;

  const className = props.className ?? '';

  return (
    <FormControl component="fieldset" className={className}>
      <FormLabel component="legend">Type</FormLabel>
      <RadioGroup
        aria-label="client-type"
        name="client-type"
        value={clientType}
        onChange={onClientTypeChange}
      >
        <FormControlLabel
          value={ClientType.TANDEM}
          control={<Radio color='primary' />}
          label="Tandem"
        />
        <FormControlLabel
          value={ClientType.STATIC_LINE}
          control={<Radio color='primary' />}
          label="Static Line"
        />
        <FormControlLabel
          value={ClientType.AS_A_PASSENGER}
          control={<Radio color='primary' />}
          label="As a passenger"
        />
      </RadioGroup>
    </FormControl>
  );
});

export default ClientEventOptions;
