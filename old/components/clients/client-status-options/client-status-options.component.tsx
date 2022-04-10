import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { clientStatusOptions } from '../../../constants/client.constants';
import { ClientStatus as ClientStatusInterface } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  statusOptions: ClientStatusInterface[],
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ClientStatusOptions: FC<PropTypesInterface> = (props): ReactElement => {
  const { statusOptions, onChange: handleStatusChange } = props;
  const clientStatusesJsx = clientStatusOptions.map((value) => {
    let checked = false;
    statusOptions.forEach(status => {
      if (status === value) {
        checked = true;
      }
    });
    return <FormControlLabel
      key={value}
      value={value}
      control={<Checkbox color="primary" checked={checked} onChange={handleStatusChange} />}
      label={value[0].toUpperCase() + value.slice(1).toLowerCase()}
      labelPlacement="start"
    />;
  });

  return (
    <>
      {clientStatusesJsx}
    </>
  );
};

export default ClientStatusOptions;
