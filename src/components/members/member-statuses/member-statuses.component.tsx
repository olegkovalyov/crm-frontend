import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { memberStatuses } from '../../../constants/member.constants';
import { MemberStatus } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  statuses: MemberStatus[],
  onStatusesChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MemberStatuses: FC<PropTypesInterface> = (props): ReactElement => {
  const { statuses, onStatusesChange: handleStatusChange } = props;
  const statusJsx = memberStatuses.map((value) => {
    let checked = false;
    statuses.forEach(status => {
      if (status === value) {
        checked = true;
      }
    });
    const color = (value === MemberStatus.ACTIVE) ? 'primary' : 'secondary';
    return <FormControlLabel
      key={value}
      value={value}
      control={<Checkbox color={color} checked={checked} onChange={handleStatusChange} />}
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

export default MemberStatuses;
