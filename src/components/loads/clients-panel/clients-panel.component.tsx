// Core
import React, { FC, ReactElement } from 'react';
import { Button, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VideocamIcon from '@material-ui/icons/Videocam';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useStyles } from './clients-panel.styles';
import { ClientInterface } from '../../../interfaces/client.interface';
import { useClientsTableRender } from '../../../hooks/ui/clients-table-render/clients-table-render.hook';
import { UserRole } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  clients: ClientInterface[] | null;
  currentLoadId: number | null;
  handleCreateSlot: (
    loadId: number,
    userId: number,
    firstName: string,
    lastName: string,
    role: UserRole,
    description: string,
  ) => Promise<void>,
}

const ClientsPanel: FC<PropTypesInterface> = (props): ReactElement => {
  const classes = useStyles();
  const clients = props.clients ?? [];
  const { handleCreateSlot, currentLoadId } = props;

  const {
    renderDate,
    renderGender,
    renderClientStatus,
    renderClientRole,
  } = useClientsTableRender();

  const columns = [
    {
      title: '',
      field: '',
      render: (client: ClientInterface) => {
        return <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            if (currentLoadId === null) {
              return;
            }
            handleCreateSlot(
              currentLoadId,
              client.userId,
              client.firstName,
              client.lastName,
              client.role as unknown as UserRole,
              '',
            );
          }}
        />;
      },
    },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Role', field: 'role', render: renderClientRole },
    {
      title: 'Options',
      field: 'options',
      render: (client: ClientInterface) => {
        return <>
          {client.withCameraman ? <VideocamIcon /> : ''}
          {client.withHandCameraVideo ? <CameraAltIcon /> : ''}
        </>;
      },
      sorting: false,
    },
  ];

  return (
    <Paper className={classes.padding}>
      <MaterialTable
        title="Clients"
        columns={columns}
        data={clients}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </Paper>
  );
};

export default ClientsPanel;
