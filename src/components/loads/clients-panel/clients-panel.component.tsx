// Core
import React, { FC, ReactElement } from 'react';
import MaterialTable from 'material-table';
import VideocamIcon from '@material-ui/icons/Videocam';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Icon from '@material-ui/core/Icon';
import { Paper } from '@material-ui/core';
import { useStyles } from './clients-panel.styles';
import { ClientInterface } from '../../../interfaces/client.interface';
import { useTableColumnRender } from '../../../hooks/ui/clients-table-render/clients-table-render.hook';
import { UserRole } from '../../../interfaces/generated/globalTypes';

interface PropTypesInterface {
  clients: ClientInterface[] | null;
  currentLoadId: number | null;
  isLoading: boolean,
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
  const {
    handleCreateSlot,
    currentLoadId,
    isLoading
  } = props;

  const {
    renderDate,
    renderGender,
    renderClientStatus,
    renderClientRole,
  } = useTableColumnRender();

  const columns = [
    {
      title: '',
      field: '',
      render: (client: ClientInterface) => {
        return <Icon
          className={classes.addSlotButton}
          color="primary"
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
        >add_circle</Icon>;
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
        isLoading={isLoading}
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
