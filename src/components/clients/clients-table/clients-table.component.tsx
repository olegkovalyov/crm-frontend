import React, { FC, ReactElement, useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import { LinearProgress } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { QueryLazyOptions } from '@apollo/client';
import ResponsiveDialog from '../../../elements/responsive-dialog.component';
import { EDIT_CLIENT_URL } from '../../../constants/route.constants';
import { ClientInterface } from '../../../interfaces/client.interface';
import { useDeleteClientMutation } from '../../../hooks/graphql/mutations/delete-client/delete-member.mutation.hook';
import { useClientsTableRender } from '../../../hooks/ui/clients-table-render/clients-table-render.hook';

interface PropTypesInterface {
  getClientsAsync: (options?: (QueryLazyOptions<null> | undefined)) => void,
  loading: boolean,
  clients: ClientInterface[],
  errorMessage: string,
}

const ClientsTable: FC<PropTypesInterface> = (props): ReactElement => {

  const {
    getClientsAsync,
    loading,
    errorMessage,
    clients,
  } = props;

  const [clientIdToDetele, setClientIdToDelete] = useState('');
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const theme = useTheme();
  const isFullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClickOpen = () => {
    setIsOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setClientIdToDelete('');
    setIsOpenDeleteDialog(false);
  };

  const handleConfirmRemove = () => {
    deleteClientAsync(clientIdToDetele).then(() => {
      setIsOpenDeleteDialog(false);
      return getClientsAsync();
    });
  };

  const {
    renderDate,
    renderGender,
    renderClientStatus,
    renderClientType,
  } = useClientsTableRender();

  const {
    inProcessOfDeletingClient,
    deleteClientAsync,
  } = useDeleteClientMutation();

  useEffect(() => {
    getClientsAsync();
  }, []); // eslint-disable-line

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
    { title: 'Type', field: 'type', render: renderClientType },
    { title: 'Status', field: 'status', render: renderClientStatus },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Certificate', field: 'certificate' },
    { title: 'Email', field: 'email' },
    { title: 'Gender', field: 'gender', render: renderGender },
    { title: 'Age', field: 'age' },
    { title: 'Weight', field: 'weight' },
    { title: 'Phone', field: 'phone' },
    {
      title: 'Date', field: 'date', render: renderDate,
    },
  ];

  return (
    <>
      <MaterialTable
        title="Clients"
        columns={columns}
        data={clients}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit client',
            onClick: (e, client: ClientInterface) => {
              const url = generatePath(EDIT_CLIENT_URL, { id: client.id });
              history.push(url);
            },
          },
          {
            icon: 'delete',
            tooltip: 'Delete client',
            onClick: (e, client: ClientInterface) => {
              setClientIdToDelete(client.id);
              handleClickOpen();
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        onRowClick={((e, client: ClientInterface) => {
          const url = generatePath(EDIT_CLIENT_URL, { id: client.id });
          history.push(url);
        })}
      />
      <ResponsiveDialog
        handleClose={handleClose}
        handleConfirm={handleConfirmRemove}
        handleCancel={handleClose}
        confirmButtonText='Delete'
        cancelButtonText='Cancel'
        title='Are you sure you want to delete client'
        isOpen={isOpenDeleteDialog}
        isFullScreen={isFullScreenDialog}
        inProcess={inProcessOfDeletingClient}
      />
    </>
  );
};

export default ClientsTable;
