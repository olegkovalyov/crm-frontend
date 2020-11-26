import React, { FC, ReactElement, useEffect, useState } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import {
  LinearProgress,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ResponsiveDialog from '../../../elements/responsive-dialog.component';
import { GetEvents_getEvents } from '../../../interfaces/generated/GetEvents';
import { useDeleteEventMutation } from '../../../hooks/graphql/mutations/delete-event/delete-event.mutation.hook';
import { EDIT_EVENT_URL, LOADS_URL } from '../../../constants/route.constants';
import EventDetails from '../event-details/event-details.component';
import { EventInterface } from '../../../interfaces/event.interface';

interface PropTypesInterface {
  getEventsAsync: (dateMin: Date | null, dateMax: Date | null) => void,
  loading: boolean,
  events: GetEvents_getEvents[],
  errorMessage: string,
}

const EventsTable: FC<PropTypesInterface> = (props): ReactElement => {

  const {
    getEventsAsync,
    loading,
    errorMessage,
    events,
  } = props;

  const [eventIdToDetele, setEventIdToDelete] = useState<number|null>(null);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const theme = useTheme();
  const isFullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleClickOpen = () => {
    setIsOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setEventIdToDelete(null);
    setIsOpenDeleteDialog(false);
  };

  const handleConfirmRemove = () => {
    if(!eventIdToDetele) {
      return;
    }
    deleteEventAsync(eventIdToDetele).then(() => {
      setIsOpenDeleteDialog(false);
      return getEventsAsync(null, null);
    });
  };

  const {
    inProcessOfDeletingEvent,
    deleteEventAsync,
  } = useDeleteEventMutation();

  useEffect(() => {
    getEventsAsync(null, null);
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
    {
      title: 'Date', field: 'date', render: (event: EventInterface) => {
        const date = new Date(event.date);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
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
            onClick: (e, event: EventInterface) => {
              const url = generatePath(EDIT_EVENT_URL, { id: event.id });
              history.push(url);
            },
          },
          {
            icon: 'delete',
            tooltip: 'Delete event',
            onClick: (e, event: EventInterface) => {
              setEventIdToDelete(event.id);
              handleClickOpen();
            },
          },
        ]}
        detailPanel={(event: EventInterface) => {
          return <EventDetails notes={event.notes} />;
        }}
        options={{
          actionsColumnIndex: -1,
        }}
        onRowClick={((e, event: EventInterface) => {
          const url = generatePath(LOADS_URL, { eventId: event.id });
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

export default EventsTable;
