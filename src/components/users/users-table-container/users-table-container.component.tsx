import React, { FC, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Grid,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useGetUsersRequest } from '../../../hooks/graphql/users-request/users-request.hook';
import { useStyles } from './users-table-container.styles';
import { CREATE_USER_URL } from '../../../constants/route.constants';
import UsersTableFilter from '../users-table-filter/users-table-filter.component';
import UsersTable from '../users-table/users-table.component';
import { useRoles } from '../../../hooks/forms/roles/roles.hook';
import { useStatusFilter } from '../../../hooks/forms/status-filter/status-filter.hook';


const UsersTableContainer: FC = (props): ReactElement => {

  const classes = useStyles();
  const history = useHistory();

  const {
    roleCheckBoxesState,
    handleRoleChange,
    getSelectedRoles,
    initCheckboxes,
  } = useRoles();

  const {
    statusCheckBoxesState,
    handleStatusChange,
    getSelectedStatuses,
    initStatusCheckboxes,
  } = useStatusFilter();

  const {
    getUsersAsync,
    users,
    loading,
    error,
  } = useGetUsersRequest();

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
              history.push(CREATE_USER_URL);
            }}
          >
            Create
          </Button>
        </Grid>
        <Grid item xs={9}>
          <UsersTableFilter
            roleCheckBoxesState={roleCheckBoxesState}
            handleRoleChange={handleRoleChange}
            getSelectedRoles={getSelectedRoles}
            updateDataAsync={getUsersAsync}
            initRoleCheckboxes={initCheckboxes}
            handleStatusChange={handleStatusChange}
            getSelectedStatuses={getSelectedStatuses}
            initStatusCheckboxes={initStatusCheckboxes}
            statusCheckBoxesState={statusCheckBoxesState}
          />
        </Grid>
        <Grid item xs={12}>
          <UsersTable
            getUsersAsync={getUsersAsync}
            getSelectedRoles={getSelectedRoles}
            getSelectedStatuses={getSelectedStatuses}
            loading={loading}
            error={error}
            users={users}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UsersTableContainer;
