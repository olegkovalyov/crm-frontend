import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { memberRoles } from '../../../constants/member.constants';
import { RoleCheckBoxesStateType } from '../../../interfaces/member.interface';

interface PropTypesInterface {
  roleCheckBoxesState: RoleCheckBoxesStateType,
  onRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Roles: FC<PropTypesInterface> = (props): ReactElement => {
  const { roleCheckBoxesState, onRoleChange } = props;
  const rolesJsx = memberRoles.map((value) => {
    return <FormControlLabel
      key={value}
      value={value}
      control={<Checkbox color="primary" checked={roleCheckBoxesState[value]} onChange={onRoleChange} />}
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

export default Roles;
