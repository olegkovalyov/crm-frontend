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
    <>
      <FormLabel component="legend">Status</FormLabel>
      <RadioGroup
        row={true}
        aria-label="client-status"
        name="client-status"
        value={clientStatus}
        onChange={onClientStatusChange}
      >
        <FormControlLabel
          value={ClientStatus.PENDING}
          control={<Radio color='primary' />}
          label="Pending"
        />
        <FormControlLabel
          value={ClientStatus.PROCESSED}
          control={<Radio color='primary' />}
          label="Processed"
        />
      </RadioGroup>
    </>
  );
});

export default ClientStatusOptions;
