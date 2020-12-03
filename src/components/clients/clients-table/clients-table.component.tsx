import React, { FC, ReactElement, useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import { LinearProgress } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ResponsiveDialog from '../../../elements/responsive-dialog.component';
import { EDIT_CLIENT_URL } from '../../../constants/route.constants';
import { ClientInterface } from '../../../interfaces/client.interface';
import { useDeleteClientMutation } from '../../../hooks/graphql/mutations/delete-client/delete-member.mutation.hook';
import { useTableColumnRender } from '../../../hooks/ui/clients-table-render/clients-table-render.hook';
import { ClientStatus, PaymentStatus } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  getClientsAsync: (
    clientStatuses: ClientStatus[] | null,
    paymentStatuses: PaymentStatus[] | null,
    isAssigned: boolean | null,
    createdAtMin: Date | null,
    createdAtMax: Date | null,
  ) => Promise<void>,
  loading: boolean,
  clients: ClientInterface[],
  errorMessage: string,
  getSelectedClientStatuses: () => ClientStatus[],
  getSelectedPaymentStatuses: () => PaymentStatus[],
  createdDateMin: Date | null,
  createdDateMax: Date | null,
}

const ClientsTable: FC<PropTypesInterface> = (props): ReactElement => {

  const {
    getClientsAsync,
    loading,
    errorMessage,
    clients,
    getSelectedPaymentStatuses,
    getSelectedClientStatuses,
    createdDateMin,
    createdDateMax,
  } = props;

  const [clientIdToDetele, setClientIdToDelete] = useState<number | null>(null);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const theme = useTheme();
  const isFullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClickOpen = () => {
    setIsOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setClientIdToDelete(null);
    setIsOpenDeleteDialog(false);
  };

  const handleConfirmRemove = () => {
    if (!clientIdToDetele) {
      return;
    }
    deleteClientAsync(clientIdToDetele).then(() => {
      setIsOpenDeleteDialog(false);
      return getClientsAsync(
        getSelectedClientStatuses(),
        getSelectedPaymentStatuses(),
        null,
        createdDateMin,
        createdDateMax,
      );
    });
  };

  const {
    renderDate,
    renderGender,
    renderClientStatus,
    renderClientRole,
  } = useTableColumnRender();

  const {
    inProcessOfDeletingClient,
    deleteClientAsync,
  } = useDeleteClientMutation();

  useEffect(() => {
    getClientsAsync(
      getSelectedClientStatuses(),
      getSelectedPaymentStatuses(),
      null,
      createdDateMin,
      createdDateMax,
    );
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
    { title: 'Type', field: 'type', render: renderClientRole },
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
      title: 'Created At', field: 'createdAt', render: renderDate,
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
