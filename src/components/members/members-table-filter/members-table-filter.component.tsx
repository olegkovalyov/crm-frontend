import React, { FC, ReactElement } from 'react';
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
import MemberRolesFilter from '../member-roles-filter/member-roles-filter.component';
import MemberStatusFilter from '../member-status-filter/member-status-filter.component';
import { MemberRole, MemberStatus } from '../../../interfaces/generated/globalTypes';
import MemberSearchFilter from '../member-search-filter/member-search-filter.component';

interface PropTypesInterface {
  // Statuses
  handleStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  selectedStatuses: MemberStatus[],
  // Roles
  handleRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  selectedRoles: MemberRole[],
  // Search
  handleSearchFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  searchFilterValue: string,
}

const MembersTableFilter: FC<PropTypesInterface> = (props): ReactElement => {

  const {
    handleStatusChange,
    selectedStatuses,
    handleRoleChange,
    selectedRoles,
    handleSearchFilterChange,
    searchFilterValue,
  } = props;

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
          <Grid item xs={12}>
            <FormLabel component="legend">Search:</FormLabel>
            <MemberSearchFilter
              searchFilterValue={searchFilterValue}
              onSearchFilterChange={handleSearchFilterChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Role:</FormLabel>
              <FormGroup row>
                <MemberRolesFilter
                  selectedRoles={selectedRoles}
                  onRoleChange={handleRoleChange}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status:</FormLabel>
              <FormGroup row>
                <MemberStatusFilter
                  selectedStatuses={selectedStatuses}
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
