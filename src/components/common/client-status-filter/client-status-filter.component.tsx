import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { clientStatuses } from '../../../constants/client.constants';
import { ClientStatusCheckBoxesStateType } from '../../../interfaces/client.interface';

interface PropTypesInterface {
  statusCheckBoxesState: ClientStatusCheckBoxesStateType,
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ClientStatusFilter: FC<PropTypesInterface> = (props): ReactElement => {
  const { statusCheckBoxesState, onStatusChange } = props;
  const clientStatusesJsx = clientStatuses.map((value) => {
    return <FormControlLabel
      key={value}
      value={value}
      control={<Checkbox color="primary" checked={statusCheckBoxesState[value]} onChange={onStatusChange} />}
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

export default ClientStatusFilter;
