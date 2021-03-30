import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { memberStatuses } from '../../../constants/member.constants';
import { MemberStatus } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  selectedStatuses: MemberStatus[],
  onStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MemberStatusFilter: FC<PropTypesInterface> = (props): ReactElement => {
  const { selectedStatuses, onStatusChange } = props;
  const statusJsx = memberStatuses.map((value) => {
    let checked = false;
    selectedStatuses.forEach(role => {
      if (role === value) {
        checked = true;
      }
    });
    const color = (value === MemberStatus.ACTIVE) ? 'primary' : 'secondary';
    return <FormControlLabel
      key={value}
      value={value}
      control={<Checkbox color={color} checked={checked} onChange={onStatusChange} />}
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

export default MemberStatusFilter;
