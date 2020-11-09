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
import MemberRoles from '../../common/member-roles/member-roles.component';
import {
  memberRoles, memberStatuses,
} from '../../../constants/member.constants';
import { RoleCheckBoxesStateType, MemberStatusCheckBoxesStateType } from '../../../interfaces/member.interface';
import MemberStatusFilter from '../../common/member-status-filter/member-status-filter.component';
import { MemberRole, MemberStatus } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  roleCheckBoxesState: RoleCheckBoxesStateType,
  statusCheckBoxesState: MemberStatusCheckBoxesStateType,
  handleRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  initStatusCheckboxes: (statuses: MemberStatus[]) => void,
  initRoleCheckboxes: (roles: MemberRole[]) => void,
  getSelectedStatuses: () => MemberStatus[],
  getSelectedRoles: () => MemberRole[],
  updateDataAsync: (status: MemberStatus[] | null, roles: MemberRole[] | null) => void,
}

const MembersTableFilter: FC<PropTypesInterface> = (props): ReactElement => {

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
    initRoleCheckboxes(memberRoles);
    initStatusCheckboxes(memberStatuses);
  }, []); // eslint-disable-line

  useEffect(() => {
    updateDataAsync(getSelectedStatuses(), getSelectedRoles());
  }, [getSelectedRoles, getSelectedStatuses]); // eslint-disable-line

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
                <MemberRoles
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
                <MemberStatusFilter
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
export default MembersTableFilter;
