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
import { useDispatch, useSelector } from 'react-redux';
import MemberSearchFilter from '../member-search-filter/member-search-filter.component';
import { useRolesFiltering } from '../../../hooks/members/roles-filtering/roles-filtering.hook';
import MemberRoles from '../member-roles/member-roles';
import MemberStatuses from '../member-statuses/member-statuses.component';
import { useStatusesFiltering } from '../../../hooks/members/statuses-filtering/statuses-filtering.hook';
import { RootStateInterface } from '../../../redux/root.reducer';
import { isExpandedMembersFilterSelector } from '../../../redux/layout/layout.selector';
import { collapseMembersFilterAction, expandMembersFilterAction } from '../../../redux/layout/layout.actions';

interface PropTypesInterface {
  // Search
  onSearchFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  searchFilterValue: string,
}

const MembersFilterContainer: FC<PropTypesInterface> = (props): ReactElement => {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state: RootStateInterface) => isExpandedMembersFilterSelector(state));

  const {
    onSearchFilterChange: handleSearchFilterChange,
    searchFilterValue,
  } = props;

  const {
    selectedRoles,
    handleRolesChange,
  } = useRolesFiltering();

  const {
    selectedStatuses,
    handleStatusesChange,
  } = useStatusesFiltering();

  const handleAccordionChange = (e: React.ChangeEvent<{}>, expanded: boolean): void => {
    expanded ? dispatch(expandMembersFilterAction()) : dispatch(collapseMembersFilterAction());
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={handleAccordionChange}
    >
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
                <MemberRoles
                  roles={selectedRoles}
                  onRolesChange={handleRolesChange}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status:</FormLabel>
              <FormGroup row>
                <MemberStatuses
                  statuses={selectedStatuses}
                  onStatusesChange={handleStatusesChange}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
export default MembersFilterContainer;
