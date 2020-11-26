import React, { FC, ReactElement, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from 'notistack';
import LoadBackdrop from '../../../elements/backdrop.component';
import EventForm from '../event-form/event-form.component';
import { useEventFormValidation } from '../../../hooks/ui/event-form-validation/event-form-validation.hook';
import { useGetEventQuery } from '../../../hooks/graphql/queries/get-event/get-event.query.hook';
import { useUpdateEventMutation } from '../../../hooks/graphql/mutations/update-event/update-event.mutation.hook';
import { useUsersList } from '../../../hooks/ui/users-list/users-list.hook';
import { useBreadcrumbs } from '../../../hooks/core/breadcrumbs/breadcrumbs.hook';

interface PropTypes {
  id: string;
}

const EditEventForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  const eventId = parseInt(props.id);
  let errorMessage = '';
  let title = '';

  const { setBreadcrumbsCustomData } = useBreadcrumbs();

  const { enqueueSnackbar } = useSnackbar();

  const {
    name,
    hasNameError,
    nameErrorMessage,
    onNameChange,
    notes,
    onNotesChange,
    date,
    onDateChange,
    formTouched,
    submitButtonEnabled,
    setEvent,
  } = useEventFormValidation();

  const {
    isEventLoading,
    getEventErrorMessage,
    event,
    staff,
    wasEventLoadCalled,
    setEventErrorMessage,
    getEventAsync,
  } = useGetEventQuery();

  const {
    inProcessOfUpdatingEvent,
    updateEventData,
    updateEventErrorMessage,
    updateEventAsync,
  } = useUpdateEventMutation();

  const {
    selectedUsers: selectedStaff,
    handleChangeUsersList: handleChangeStaffList,
    setSelectedUsers: setStaff,
  } = useUsersList();

  // Loading Event
  useEffect(() => {
    getEventAsync(eventId);
  }, []); // eslint-disable-line


  useEffect(() => {
    if (event) {
      setBreadcrumbsCustomData(props.id, event.name);
      const staffIds = event.staff.map(value => value.id);
      setStaff(staffIds);
    }
  }, [event]); // eslint-disable-line

  useEffect(() => {
    if (!isEventLoading
      && wasEventLoadCalled) {
      if (event) {
        setEvent(event.name, event.date, event.notes);
      } else {
        setEventErrorMessage('Failed to load event');
      }
    }

  }, [isEventLoading, wasEventLoadCalled]); // eslint-disable-line

  useEffect(() => {
    if (updateEventData) {
      enqueueSnackbar('Saved', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'bottom',
        },
      });
    }
  }, [updateEventData]); // eslint-disable-line


  if (isEventLoading) {
    return (
      <>
        <LoadBackdrop isOpen={true} />
      </>
    );
  }

  if (getEventErrorMessage) {
    return (
      <>
        <Alert severity="error">{getEventErrorMessage}</Alert>
      </>
    );
  }
  // End Loading Event

  // Updating Event
  if (updateEventErrorMessage) {
    errorMessage = updateEventErrorMessage;
  }
  // End Updating Event
  if (event) {
    title = event.name;
  }


  return (
    <EventForm
      title={title}
      name={name}
      hasNameError={hasNameError}
      nameErrorMessage={nameErrorMessage}
      onNameChange={onNameChange}
      notes={notes}
      onNotesChange={onNotesChange}
      date={date}
      onDateChange={onDateChange}
      members={staff}
      selectedStaff={selectedStaff}
      onStaffChange={handleChangeStaffList}
      formTouched={formTouched}
      submitButtonEnabled={submitButtonEnabled}
      formErrorMessage={errorMessage}
      loading={inProcessOfUpdatingEvent}
      submitBtnTitle='Save'
      submitFn={() => {
        return updateEventAsync(eventId, name, date, notes, selectedStaff);
      }}
    />
  );
};

export default EditEventForm;
