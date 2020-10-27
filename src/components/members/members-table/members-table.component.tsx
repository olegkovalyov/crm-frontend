import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import { LinearProgress } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BlockIcon from '@material-ui/icons/Block';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { useSnackbar } from 'notistack';
import ResponsiveDialog from '../../../elements/responsive-dialog.component';
import { useDeleteMemberMutation } from '../../../hooks/graphql/mutations/delete-member/delete-member.mutation.hook';
import { EDIT_MEMBER_URL } from '../../../constants/route.constants';
import { MemberInterface } from '../../../interfaces/member.interface';
import { MemberRole, MemberStatus } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  getMembersAsync: (
    status: MemberStatus[] | null,
    roles: MemberRole[] | null,
  ) => Promise<void>,
  loading: boolean,
  members: MemberInterface[],
  errorMessage: string,
  getSelectedStatuses: () => MemberStatus[],
  getSelectedRoles: () => MemberRole[],
}

const MembersTable: FC<PropTypesInterface> = (props): ReactElement => {

  const {
    getMembersAsync,
    loading,
    errorMessage,
    members,
    getSelectedRoles,
    getSelectedStatuses,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [memberIdToDetele, setMemberIdToDelete] = useState('');
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const theme = useTheme();
  const isFullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClickOpen = () => {
    setIsOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setMemberIdToDelete('');
    setIsOpenDeleteDialog(false);
  };

  const handleConfirmRemove = () => {
    deleteMemberAsync(memberIdToDetele);
  };

  const {
    inProcessOfDeletingMember,
    deleteUserErrorMessage,
    deletedUserData,
    deleteMemberAsync,
  } = useDeleteMemberMutation();

  useEffect(() => {
    if (deleteUserErrorMessage) {
      enqueueSnackbar(deleteUserErrorMessage, {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom',
        },
      });
    }
  }, [deleteUserErrorMessage]); // eslint-disable-line

  useEffect(() => {
    if (deletedUserData) {
      enqueueSnackbar('Member successfully deleted', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom',
        },
      });
      setIsOpenDeleteDialog(false);
      getMembersAsync(getSelectedStatuses(), getSelectedRoles());
    }
  }, [deletedUserData]); // eslint-disable-line

  if (loading) {
    return (
      <>
        <LinearProgress />
      </>
    );
  }

  if (errorMessage) {
    return (
      <>
        <Alert severity="error">{errorMessage}</Alert>
      </>
    );
  }


  const columns = [
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    {
      title: 'Active', field: 'status', render: (member: MemberInterface) => {
        return (member.status === MemberStatus.ACTIVE) ?
          <HowToRegIcon color='primary' /> :
          <BlockIcon color='error' />;
      },
    },
    { title: 'Email', field: 'email' },
    { title: 'Role', field: 'roles', render: (member: MemberInterface) => member.roles.join(', ') },
    { title: 'License', field: 'licenseType' },
    {
      title: 'Created At', field: 'createdAt', render: (member: MemberInterface) => {
        const date = new Date(member.createdAt);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
    {
      title: 'Updated At', field: 'updatedAt', render: (member: MemberInterface) => {
        const date = new Date(member.updatedAt);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
  ];

  return (
    <>
      <MaterialTable
        title="Members"
        columns={columns}
        data={members}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete Member',
            onClick: (e, member: MemberInterface) => {
              setMemberIdToDelete(member.id);
              handleClickOpen();
            },
          },
        ]}
        onRowClick={((e, member: MemberInterface) => {
          const url = generatePath(EDIT_MEMBER_URL, { id : member.id });
          history.push(url);
        })}
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
        title='Are you sure you want to delete member'
        isOpen={isOpenDeleteDialog}
        isFullScreen={isFullScreenDialog}
        inProcess={inProcessOfDeletingMember}
      />
    </>
  );
};

export default MembersTable;
