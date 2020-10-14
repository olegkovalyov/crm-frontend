import React, { FC, ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import {
  LinearProgress,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BlockIcon from '@material-ui/icons/Block';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { ApolloError } from '@apollo/client';
import { GetUsers_getUsers } from '../../../interfaces/generated/GetUsers';
import ResponsiveDialog from '../../../elements/responsive-dialog.component';
import { useDeleteUserRequest } from '../../../hooks/graphql/delete-user-request/delete-user-request.hook';
import { EDIT_USER_URL } from '../../../constants/route.constants';
import { UserInterface } from '../../../interfaces/user.interface';
import { RolesType, USER_STATUS_ACTIVE, UserStatusType } from '../../../constants/user.constants';

interface IPropTypes {
  getUsersAsync: (
    status: UserStatusType[] | null,
    roles: RolesType[] | null,
  ) => Promise<void>,
  loading: boolean,
  users: GetUsers_getUsers[],
  error: ApolloError | undefined,
  getSelectedStatuses: () => UserStatusType[],
  getSelectedRoles: () => RolesType[],
}

const UsersTable: FC<IPropTypes> = (props): ReactElement => {

  const {
    getUsersAsync,
    loading,
    error,
    users,
    getSelectedRoles,
    getSelectedStatuses,
  } = props;

  const [userIdToDetele, setUserIdToDelete] = useState('');
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const theme = useTheme();
  const isFullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

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
      return getUsersAsync(getSelectedStatuses(), getSelectedRoles());
    });
  };

  const {
    deleting,
    deleteUserAsync,
  } = useDeleteUserRequest();

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
