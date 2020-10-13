import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { userRoles } from '../../../constants/user.constants';
import { RoleCheckBoxesStateType } from '../../../interfaces/user.interface';

interface IPropTypes {
  roleCheckBoxesState: RoleCheckBoxesStateType,
  onRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Roles: FC<IPropTypes> = (props): ReactElement => {
  const { roleCheckBoxesState, onRoleChange } = props;
  const rolesJsx = userRoles.map((value) => {
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
