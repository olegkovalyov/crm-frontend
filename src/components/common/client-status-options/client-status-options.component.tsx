import React, { FC, ReactElement } from 'react';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { ClientStatus } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  clientStatus: ClientStatus,
  onClientStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string,
}

const ClientStatusOptions: FC<PropTypesInterface> = React.memo((props): ReactElement => {

  const {
    clientStatus,
    onClientStatusChange,
  } = props;

  const className = props.className ?? '';

  return (
    <FormControl component="fieldset" className={className}>
      <FormLabel component="legend">Status</FormLabel>
      <RadioGroup
        aria-label="client-status"
        name="client-status"
        value={clientStatus}
        onChange={onClientStatusChange}
      >
        <FormControlLabel
          value={ClientStatus.ACTIVE}
          control={<Radio color='primary' />}
          label="Active"
        />
        <FormControlLabel
          value={ClientStatus.PROCESSED}
          control={<Radio color='primary' />}
          label="Processed"
        />
        <FormControlLabel
          value={ClientStatus.REFUSED}
          control={<Radio color='secondary' />}
          label="Refused"
        />
      </RadioGroup>
    </FormControl>
  );
});

export default ClientStatusOptions;
