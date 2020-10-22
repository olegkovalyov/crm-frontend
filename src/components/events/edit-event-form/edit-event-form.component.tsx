import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoadBackdrop from '../../../elements/backdrop.component';
import { EVENTS_URL } from '../../../constants/route.constants';
import CommonEventForm from '../common-event-form/common-event-form.component';
import { useEventFormValidation } from '../../../hooks/forms/event-form-validation/event-form-validation.hook';
import { useGetEventQuery } from '../../../hooks/graphql/queries/get-event/get-event.query.hook';
import { EventInterface } from '../../../interfaces/event.interface';
import { useUpdateEventMutation } from '../../../hooks/graphql/mutations/update-event/update-event.mutation.hook';
import { UserInterface } from '../../../interfaces/user.interface';
import { useUsersList } from '../../../hooks/forms/users-list/users-list.hook';

interface PropTypes {
  id: string;
}

const EditEventForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  let errorMessage = '';
  let title = '';
  let users: UserInterface[] = [];

  const [isEventLoaded, setIsEventLoaded] = useState(false);


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
    eventData,
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
    getEventAsync(props.id);
  }, []);

  useEffect(() => {
    if (eventData && eventData.getEvent) {
      const staffIds = eventData.getEvent.staff.map(value => value.id);
      setStaff(staffIds);
    }
  }, [eventData]);

  if (eventData && !isEventLoaded) {
    const currentEvent = eventData.getEvent as EventInterface;
    users = eventData.getStaff as UserInterface[];
    if (currentEvent !== null) {
      setEvent(currentEvent.name, currentEvent.date, currentEvent.notes);
      setIsEventLoaded(true);
    } else {
      return <Redirect to={EVENTS_URL} />;
    }
  }


  if (isEventLoading) {
    return (
      <>
        <LoadBackdrop isOpen={true} />
      </>
    );
  }

  if (getEventErrorMessage) {
    errorMessage = getEventErrorMessage;
  }
  // End Loading Event

  // Updating Event
  if (updateEventErrorMessage) {
    errorMessage = updateEventErrorMessage;
  }

  if (updateEventData) {
    return <Redirect to={EVENTS_URL} />;
  }
  // End Updating Event
  if (eventData && eventData.getEvent) {
    title = eventData.getEvent.name;
  }

  if (eventData && eventData.getStaff) {
    users = eventData.getStaff as UserInterface[];
  }

  return (
    <CommonEventForm
      title={title}
      name={name}
      hasNameError={hasNameError}
      nameErrorMessage={nameErrorMessage}
      onNameChange={onNameChange}
      notes={notes}
      onNotesChange={onNotesChange}
      date={date}
      onDateChange={onDateChange}
      users={users}
      selectedStaff={selectedStaff}
      onStaffChange={handleChangeStaffList}
      formTouched={formTouched}
      submitButtonEnabled={submitButtonEnabled}
      formErrorMessage={errorMessage}
      loading={inProcessOfUpdatingEvent}
      submitBtnTitle='Save'
      submitFn={() => {
        return updateEventAsync(props.id, name, date, notes, selectedStaff);
      }}
    />
  );
};

export default EditEventForm;
