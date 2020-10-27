import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import {
  LinearProgress,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {  QueryLazyOptions } from '@apollo/client';
import ResponsiveDialog from '../../../elements/responsive-dialog.component';
import { GetEvents_getEvents } from '../../../interfaces/generated/GetEvents';
import { useDeleteEventMutation } from '../../../hooks/graphql/mutations/delete-event/delete-event.mutation.hook';
import { EDIT_EVENT_URL } from '../../../constants/route.constants';
import { MemberInterface } from '../../../interfaces/member.interface';

interface PropTypesInterface {
  getEventsAsync: (options?: (QueryLazyOptions<null> | undefined)) => void,
  loading: boolean,
  events: GetEvents_getEvents[],
  errorMessage: string,
}

const LoadsTable: FC<PropTypesInterface> = (props): ReactElement => {

  const {
    getEventsAsync,
    loading,
    errorMessage,
    events,
  } = props;

  const [eventIdToDetele, setEventIdToDelete] = useState('');
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const theme = useTheme();
  const isFullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClickOpen = () => {
    setIsOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setEventIdToDelete('');
    setIsOpenDeleteDialog(false);
  };

  const handleConfirmRemove = () => {
    deleteEventAsync(eventIdToDetele).then(() => {
      setIsOpenDeleteDialog(false);
      return getEventsAsync();
    });
  };

  const {
    inProcessOfDeletingEvent,
    deleteEventAsync,
  } = useDeleteEventMutation();

  useEffect(() => {
    getEventsAsync();
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
    { title: 'Name', field: 'name' },
    { title: 'Date', field: 'date' },
  ];

  return (
    <>
      <MaterialTable
        title="Events"
        columns={columns}
        data={events}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Event',
            onClick: (event, rowData) => {
              const { id } = rowData as MemberInterface;
              const url = `${EDIT_EVENT_URL}/${id}`;
              history.push(url);
            },
          },
          {
            icon: 'delete',
            tooltip: 'Delete event',
            onClick: (event, rowData) => {
              setEventIdToDelete((rowData as GetEvents_getEvents).id);
              handleClickOpen();
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        onRowClick={((event, rowData) => {
          const { id } = rowData as GetEvents_getEvents;
          const url = `${EDIT_EVENT_URL}/${id}`;
          history.push(url);
        })}
      />
      <ResponsiveDialog
        handleClose={handleClose}
        handleConfirm={handleConfirmRemove}
        handleCancel={handleClose}
        confirmButtonText='Delete'
        cancelButtonText='Cancel'
        title='Are you sure you want to delete event'
        isOpen={isOpenDeleteDialog}
        isFullScreen={isFullScreenDialog}
        inProcess={inProcessOfDeletingEvent}
      />
    </>
  );
};

export default LoadsTable;
