import React, { FC, ReactElement, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormGroup,
  FormLabel,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Roles from '../roles/roles.component';
import {
  ROLE_ADMIN, ROLE_CAMERAMAN, ROLE_COACH,
  ROLE_MANIFEST, ROLE_PACKER, ROLE_RIGGER, ROLE_SKYDIVER, ROLE_STUDENT,
  RolesType,
  USER_STATUS_ACTIVE,
  UserStatusType,
} from '../../../constants/user.constants';
import { RoleCheckBoxesStateType } from '../../../interfaces/user.interface';

interface IPropType {
  updateDataFn: (status: UserStatusType | null, roles: RolesType[] | null) => void,
  roleCheckBoxesState: RoleCheckBoxesStateType,
  handleRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  getSelectedRoles: () => RolesType[],
  initCheckboxes: (roles: RolesType[]) => void,
}

const UsersTableFilter: FC<IPropType> = (props): ReactElement => {

  const {
    updateDataFn,
    handleRoleChange,
    getSelectedRoles,
    roleCheckBoxesState,
    initCheckboxes,
  } = props;

  useEffect(() => {
    const roles: RolesType[] = [
      ROLE_MANIFEST,
      ROLE_ADMIN,
      ROLE_SKYDIVER,
      ROLE_CAMERAMAN,
      ROLE_PACKER,
      ROLE_RIGGER,
      ROLE_COACH,
      ROLE_STUDENT,
    ];
    initCheckboxes(roles);
  }, []);

  useEffect(() => {
    updateDataFn(null, getSelectedRoles());
  }, [getSelectedRoles]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant='button'>Filter</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl component="fieldset">
          <FormLabel component="legend">Roles</FormLabel>
          <FormGroup>
            <Roles
              roleCheckBoxesState={roleCheckBoxesState}
              onRoleChange={(e) => {
                handleRoleChange(e);
                // const roles = getSelectedRoles().length ? getSelectedRoles() : null;
                // console.log(roles);
                // console.log('MANUAL FETCH');
                // updateDataFn(USER_STATUS_ACTIVE, roles);
              }}
            />
          </FormGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};
export default UsersTableFilter;
