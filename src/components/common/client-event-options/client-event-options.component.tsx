import React, { FC, ReactElement } from 'react';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { ClientRole } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  clientRole: ClientRole,
  onClientRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string,
}

const ClientEventOptions: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    clientRole,
    onClientRoleChange,
  } = props;

  const className = props.className ?? '';

  return (
    <FormControl component="fieldset" className={className}>
      <FormLabel component="legend">Type</FormLabel>
      <RadioGroup
        aria-label="client-type"
        name="client-type"
        value={clientRole}
        onChange={onClientRoleChange}
      >
        <FormControlLabel
          value={ClientRole.TANDEM}
          control={<Radio color='primary' />}
          label="Tandem"
        />
        <FormControlLabel
          value={ClientRole.STATIC_LINE}
          control={<Radio color='primary' />}
          label="Static Line"
        />
        <FormControlLabel
          value={ClientRole.AS_A_PASSENGER}
          control={<Radio color='primary' />}
          label="As a passenger"
        />
      </RadioGroup>
    </FormControl>
  );
});

export default ClientEventOptions;
