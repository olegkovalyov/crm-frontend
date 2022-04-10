import React, { FC, ReactElement } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { memberRoles } from '../../../constants/member.constants';
import { MemberRole } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  roles: MemberRole[],
  onRolesChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const MemberRolesOptions: FC<PropTypesInterface> = (props): ReactElement => {

  const { roles, onRolesChange: handleRolesChange } = props;

  const rolesJsx = memberRoles.map((value) => {
    let checked = false;
    roles.forEach(role => {
      if (role === value) {
        checked = true;
      }
    });
    return <FormControlLabel
      key={value}
      value={value}
      control={<Checkbox color="primary" checked={checked} onChange={handleRolesChange} />}
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

export default MemberRolesOptions;
