import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import { Button, Grid, LinearProgress } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useGetUsersRequest } from '../../../hooks/graphql/users-request/users-request.hook';
import { GetUsers_getUsers } from '../../../interfaces/generated/GetUsers';
import { useStyles } from './users-table.styles';
import ResponsiveDialog from '../../../elements/responsive-dialog.component';
import { useDeleteUserRequest } from '../../../hooks/graphql/delete-user-request/delete-user-request.hook';
import { CREATE_USER_URL, EDIT_USER_URL } from '../../../constants/route.constants';
import { UserInterface } from '../../../interfaces/user.interface';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import BlockIcon from '@material-ui/icons/Block';
import { USER_STATUS_ACTIVE } from '../../../constants/user.constants';


const UsersTable: FC = (props): ReactElement => {
  const [userIdToDetele, setUserIdToDelete] = useState('');
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const theme = useTheme();
  const isFullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setIsOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setUserIdToDelete('');
    setIsOpenDeleteDialog(false);
  };

  const handleConfirmRemove = () => {
    deleteUserAsync(userIdToDetele).then(() => {
      setIsOpenDeleteDialog(false);
      return getUsersAsync();
    });
  };

  const classes = useStyles();
  const history = useHistory();

  const {
    getUsersAsync,
    loading,
    users,
    error,
  } = useGetUsersRequest();

  const {
    deleting,
    deleteUserAsync,
  } = useDeleteUserRequest();

  useEffect(() => {
    // console.log('Refetch users');
    getUsersAsync();
    // return () => console.log('Unmounted');
  }, [getUsersAsync]);

  if (loading) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Alert severity="error">{error.message}</Alert>
      </>
    );
  }


  const columns = [
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    {
      title: 'Active', field: 'status', render: (user: UserInterface) => {
        return (user.status === USER_STATUS_ACTIVE) ?
          <HowToRegIcon color='primary' /> :
          <BlockIcon color='error' />;
      },
    },
    { title: 'Email', field: 'email' },
    { title: 'Role', field: 'roles', render: (user: UserInterface) => user.roles.join(', ') },
    { title: 'License', field: 'licenseType' },
    { title: 'Created At', field: 'createdAt' },
    { title: 'Updated At', field: 'updatedAt' },
  ];

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
        <Grid item xs={12}>
          <MaterialTable
            title="Users"
            columns={columns}
            data={users}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) => {
                  const { id } = rowData as GetUsers_getUsers;
                  const url = `${EDIT_USER_URL}/${id}`;
                  history.push(url);
                },
              },
              {
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rowData) => {
                  setUserIdToDelete((rowData as GetUsers_getUsers).id);
                  handleClickOpen();
                },
              },
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </Grid>
      </Grid>
      <ResponsiveDialog
        handleClose={handleClose}
        handleConfirm={handleConfirmRemove}
        handleCancel={handleClose}
        confirmButtonText='Delete'
        cancelButtonText='Cancel'
        title='Are you sure you want to delete user'
        isOpen={isOpenDeleteDialog}
        isFullScreen={isFullScreenDialog}
        inProcess={deleting}
      />
    </>
  );
};

export default UsersTable;
