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
import { RootStateInterface } from '../../../redux/root.reducer';
import { isExpandedMembersFilterSelector } from '../../../redux/layout/layout.selector';
import { collapseMembersFilterAction, expandMembersFilterAction } from '../../../redux/layout/layout.actions';
import { useRolesFilter } from '../../../hooks/members/roles-filter/roles-filter.hook';
import { useStatusFilter } from '../../../hooks/members/status-filter/status-filter.hook';
import MembersSearchFilter from '../members-search-filter/members-search-filter.component';
import MemberRolesOptions from '../member-roles-options/member-roles-options.component';
import MemberStatusOptions from '../member-status-options/member-status-options.component';

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
    selectedRolesOptions,
    handleRolesOptionsChange,
  } = useRolesFilter();

  const {
    selectedStatusOptions,
    handleStatusOptionsChange,
  } = useStatusFilter()

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
            <MembersSearchFilter
              searchFilterValue={searchFilterValue}
              onSearchFilterChange={handleSearchFilterChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Role:</FormLabel>
              <FormGroup row>
                <MemberRolesOptions
                  roles={selectedRolesOptions}
                  onRolesChange={handleRolesOptionsChange}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status:</FormLabel>
              <FormGroup row>
                <MemberStatusOptions
                  statusOptions={selectedStatusOptions}
                  onChange={handleStatusOptionsChange}
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
