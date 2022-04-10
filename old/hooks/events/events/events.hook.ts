import { useEffect, useState } from 'react';
import { ChangeSet } from '@devexpress/dx-react-scheduler';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateEventMutation } from '../../graphql/mutations/create-event/create-event.mutation.hook';
import { RootStateInterface } from '../../../redux/root.reducer';
import { getEvents } from '../../../redux/events/events.selector';
import {
  addEventAction,
  deleteEventAction,
  setEventsAction,
  updateEventAction,
} from '../../../redux/events/events.actions';
import { InitialEventsPropTypesInterface } from '../../../interfaces/event.interface';
import { useDeleteEventMutation } from '../../graphql/mutations/delete-event/delete-event.mutation.hook';
import { useUpdateEventMutation } from '../../graphql/mutations/update-event/update-event.mutation.hook';

export const useEvents = (props: InitialEventsPropTypesInterface) => {
  const { initialEvents, initialEventsLoadErrorMessage } = props;
  const dispatch = useDispatch();
  const [schedulerErrorMessage, setSchedulerErrorMessage] = useState<string | null>(null);
  const [schedulerSuccessMessage, setSchedulerSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const events = useSelector((state: RootStateInterface) => getEvents(state));

  useEffect(() => {
    const preparedEvents = initialEvents.map(event => ({
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
    }));
    dispatch(setEventsAction(preparedEvents));
  }, []);

  const {
    inProcessOfCreatingEvent,
    createEventErrorMessage,
    handleCreateEvent,
    createdEvent,
  } = useCreateEventMutation();

  const {
    inProcessOfDeletingEvent,
    deleteEventErrorMessage,
    handleDeleteEvent,
    deletedEvent,
  } = useDeleteEventMutation();

  const {
    inProcessOfUpdatingEvent,
    updateEventErrorMessage,
    handleUpdateEvent,
    updatedEvent,
  } = useUpdateEventMutation();


  // Handle error messages
  useEffect(() => {
    if (createEventErrorMessage) {
      setSchedulerErrorMessage(createEventErrorMessage);
      return;
    }
    if (deleteEventErrorMessage) {
      setSchedulerErrorMessage(deleteEventErrorMessage);
      return;
    }
    if (updateEventErrorMessage) {
      setSchedulerErrorMessage(updateEventErrorMessage);
      return;
    }
    setSchedulerErrorMessage(null);
  }, [
    initialEventsLoadErrorMessage,
    createEventErrorMessage,
    deleteEventErrorMessage,
    updateEventErrorMessage,
  ]);

  useEffect(() => {
    if (createdEvent) {
      dispatch(addEventAction({
        ...createdEvent,
        startDate: new Date(createdEvent.startDate),
        endDate: new Date(createdEvent.endDate),
      }));
      setSchedulerSuccessMessage('Successfully created event');
    } else {
      setSchedulerSuccessMessage(null);
    }
  }, [createdEvent]);

  useEffect(() => {
    if (deletedEvent) {
      dispatch(deleteEventAction(deletedEvent.id));
      setSchedulerSuccessMessage('Successfully deleted event');
    } else {
      setSchedulerSuccessMessage(null);
    }
  }, [deletedEvent]);

  useEffect(() => {
    if (updatedEvent) {
      dispatch(updateEventAction({
        ...updatedEvent,
        startDate: new Date(updatedEvent.startDate),
        endDate: new Date(updatedEvent.endDate),
      }));
      setSchedulerSuccessMessage('Successfully updated event');
    } else {
      setSchedulerSuccessMessage(null);
    }
  }, [updatedEvent]);

  useEffect(() => {
    if (inProcessOfCreatingEvent
      || inProcessOfDeletingEvent
      || inProcessOfUpdatingEvent
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [
    inProcessOfCreatingEvent,
    inProcessOfDeletingEvent,
    inProcessOfUpdatingEvent,
  ]);

  const handleCommitChanges = async (changes: ChangeSet): Promise<void> => {
    const {
      added: addedEvent,
      changed: changedEvent,
      deleted: deletedEventId,
    } = changes;

    if (addedEvent) {
      await handleCreateEvent(
        addedEvent.title,
        addedEvent.startDate,
        addedEvent.endDate,
        addedEvent.notes,
      );
    }

    if (deletedEventId) {
      await handleDeleteEvent(deletedEventId as number);
    }

    if (changedEvent) {
      const updatedEventId = parseInt(Object.keys(changedEvent)[0]);
      const updateData = {
        title: null,
        startDate: null,
        endDate: null,
        notes: null,
        ...changedEvent[updatedEventId],
      };
      await handleUpdateEvent(
        updatedEventId,
        updateData.title,
        updateData.startDate,
        updateData.endDate,
        updateData.notes,
      );
    }

    console.log('Added:', addedEvent);
    console.log('Changed:', changedEvent);
    console.log('Deleted:', deletedEventId);
  };

  return {
    handleCommitChanges,
    initialEventsLoadErrorMessage,
    schedulerErrorMessage,
    schedulerSuccessMessage,
    isLoading,
    events,
  };
};


