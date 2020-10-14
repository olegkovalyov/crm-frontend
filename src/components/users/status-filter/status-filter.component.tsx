import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { userStatuses } from '../../../constants/user.constants';
import { UserStatusCheckBoxesStateType } from '../../../interfaces/user.interface';

interface IPropTypes {
  statusCheckBoxesState: UserStatusCheckBoxesStateType,
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const StatusFilter: FC<IPropTypes> = (props): ReactElement => {
  const { statusCheckBoxesState, onStatusChange } = props;
  const statusJsx = userStatuses.map((value) => {
    const color = (value === 'ACTIVE') ? 'primary' : 'secondary';
    return <FormControlLabel
      key={value}
      value={value}
      control={<Checkbox color={color} checked={statusCheckBoxesState[value]} onChange={onStatusChange} />}
      label={value[0].toUpperCase() + value.slice(1).toLowerCase()}
      labelPlacement="start"
    />;
  });

  return (
    <>
      {statusJsx}
    </>
  );
};

export default StatusFilter;
