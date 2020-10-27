import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { memberStatuses } from '../../../constants/member.constants';
import { MemberStatusCheckBoxesStateType } from '../../../interfaces/member.interface';

interface PropTypesInterface {
  statusCheckBoxesState: MemberStatusCheckBoxesStateType,
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const StatusFilter: FC<PropTypesInterface> = (props): ReactElement => {
  const { statusCheckBoxesState, onStatusChange } = props;
  const statusJsx = memberStatuses.map((value) => {
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
