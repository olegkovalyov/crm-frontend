import React, { FC, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Grid,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useGetMembersQuery } from '../../../hooks/graphql/queries/get-members/get-members.query.hook';
import { useStyles } from './members-table-container.styles';
import { CREATE_MEMBER_URL } from '../../../constants/route.constants';
import MembersTableFilter from '../members-table-filter/members-table-filter.component';
import MembersTable from '../members-table/members-table.component';
import { useMemberRolesFilter } from '../../../hooks/ui/member-roles-filter/member-roles-filter.hook';
import { useMemberStatusFilter } from '../../../hooks/ui/member-status-filter/member-status-filter.hook';


const MembersTableContainer: FC = (props): ReactElement => {

  const classes = useStyles();
  const history = useHistory();

  const {
    roleCheckBoxesState,
    handleRoleChange,
    getSelectedRoles,
    initCheckboxes,
  } = useMemberRolesFilter();

  const {
    statusCheckBoxesState,
    handleStatusChange,
    getSelectedStatuses,
    initStatusCheckboxes,
  } = useMemberStatusFilter();

  const {
    members,
    areMembersLoading,
    getMembersErrorMessage,
    getMembersAsync,
  } = useGetMembersQuery();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<PersonAddIcon />}
            onClick={(e: React.MouseEvent) => {
              history.push(CREATE_MEMBER_URL);
            }}
          >
            Create
          </Button>
        </Grid>
        <Grid item xs={9}>
          <MembersTableFilter
            roleCheckBoxesState={roleCheckBoxesState}
            handleRoleChange={handleRoleChange}
            getSelectedRoles={getSelectedRoles}
            updateDataAsync={getMembersAsync}
            initRoleCheckboxes={initCheckboxes}
            handleStatusChange={handleStatusChange}
            getSelectedStatuses={getSelectedStatuses}
            initStatusCheckboxes={initStatusCheckboxes}
            statusCheckBoxesState={statusCheckBoxesState}
          />
        </Grid>
        <Grid item xs={12}>
          <MembersTable
            getMembersAsync={getMembersAsync}
            getSelectedRoles={getSelectedRoles}
            getSelectedStatuses={getSelectedStatuses}
            loading={areMembersLoading}
            errorMessage={getMembersErrorMessage}
            members={members}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MembersTableContainer;
