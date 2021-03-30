import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { memberRoles } from '../../../constants/member.constants';
import { MemberRole } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  selectedRoles: MemberRole[],
  onRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MemberRolesFilter: FC<PropTypesInterface> = (props): ReactElement => {
  const { selectedRoles, onRoleChange } = props;
  const rolesJsx = memberRoles.map((value) => {
    let checked = false;
    selectedRoles.forEach(role => {
      if (role === value) {
        checked = true;
      }
    });
    return <FormControlLabel
      key={value}
      value={value}
      control={<Checkbox color="primary" checked={checked} onChange={onRoleChange} />}
      label={value[0].toUpperCase() + value.slice(1).toLowerCase()}
      labelPlacement="start"
    />;
  });

  return (
    <>
      {rolesJsx}
    </>
  );
};

export default MemberRolesFilter;
