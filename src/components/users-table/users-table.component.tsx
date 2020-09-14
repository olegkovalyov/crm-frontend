import React, { FC, ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import { Button, LinearProgress } from '@material-ui/core';
import { ApolloError } from 'apollo-client';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useGetUsersRequest } from '../../hooks/users-request/users-request.hook';
import { GetUsers_getUsers } from '../../interfaces/generated/GetUsers';
import { url } from '../../constants/url';
import { useStyles } from './users-table.styles';


const UsersTable: FC = (props): ReactElement => {

  const classes = useStyles();
  const history = useHistory();

  const { loading, users, error, getUsersAsync } = useGetUsersRequest();

  useEffect(getUsersAsync, []);

  if (loading) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  if (error instanceof ApolloError) {
    return (
      <>
        <Alert severity="error">{error.message}</Alert>
      </>
    );
  }


  const columns = [
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Email', field: 'email' },
    { title: 'Role', field: 'role' },
    { title: 'License', field: 'licenseType' },
    { title: 'Created At', field: 'createdAt' },
    { title: 'Updated At', field: 'updatedAt' },
  ];

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<PersonAddIcon />}
        onClick={(e: React.MouseEvent) => {
          history.push(url.createUser);
        }}
      >
        Add
      </Button>
      <MaterialTable
        title="Users"
        columns={columns}
        data={users}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: (event, rowData) => {
              history.push(`${url.editUser}/${(rowData as GetUsers_getUsers).id}`);
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </>
  );
};

export default UsersTable;
