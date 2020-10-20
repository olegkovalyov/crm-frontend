import React, { FC, ReactElement, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormGroup,
  FormLabel, Grid,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Roles from '../roles/roles.component';
import {
  userRoles, userStatuses,
} from '../../../constants/user.constants';
import { RoleCheckBoxesStateType, UserStatusCheckBoxesStateType } from '../../../interfaces/user.interface';
import StatusFilter from '../status-filter/status-filter.component';
import { UserRole, UserStatus } from '../../../interfaces/generated/globalTypes';

interface IPropType {
  roleCheckBoxesState: RoleCheckBoxesStateType,
  statusCheckBoxesState: UserStatusCheckBoxesStateType,
  handleRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  initStatusCheckboxes: (statuses: UserStatus[]) => void,
  initRoleCheckboxes: (roles: UserRole[]) => void,
  getSelectedStatuses: () => UserStatus[],
  getSelectedRoles: () => UserRole[],
  updateDataAsync: (status: UserStatus[] | null, roles: UserRole[] | null) => void,
}

const UsersTableFilter: FC<IPropType> = (props): ReactElement => {

  const {
    updateDataAsync,
    handleRoleChange,
    getSelectedRoles,
    roleCheckBoxesState,
    initRoleCheckboxes,
    handleStatusChange,
    getSelectedStatuses,
    statusCheckBoxesState,
    initStatusCheckboxes,
  } = props;

  useEffect(() => {
    initRoleCheckboxes(userRoles);
    initStatusCheckboxes(userStatuses);
  }, []);

  useEffect(() => {
    updateDataAsync(getSelectedStatuses(), getSelectedRoles());
  }, [getSelectedRoles, getSelectedStatuses]);

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
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Role:</FormLabel>
              <FormGroup>
                <Roles
                  roleCheckBoxesState={roleCheckBoxesState}
                  onRoleChange={handleRoleChange}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status:</FormLabel>
              <FormGroup>
                <StatusFilter
                  statusCheckBoxesState={statusCheckBoxesState}
                  onStatusChange={handleStatusChange}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
export default UsersTableFilter;
