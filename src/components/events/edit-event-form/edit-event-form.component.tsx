import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoadBackdrop from '../../../elements/backdrop.component';
import { EVENTS_URL } from '../../../constants/route.constants';
import CommonEventForm from '../common-event-form/common-event-form.component';
import { useEventFormValidation } from '../../../hooks/forms/event-form-validation/event-form-validation.hook';
import { useGetEventRequest } from '../../../hooks/graphql/get-event-request/get-event-request.hook';
import { EventInterface } from '../../../interfaces/event.interface';
import { useUpdateEventRequest } from '../../../hooks/graphql/update-event-request/update-event-request.hook';

interface PropTypes {
  id: string;
}

const EditEventForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  let errorMessage = '';

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

  const { isEventLoading, eventError, eventData, getEvent } = useGetEventRequest(props.id);

  const { loading, updateErrorMessage, updatedEventData, updateEventAsync } = useUpdateEventRequest();

  // Loading Event
  useEffect(() => {
    getEvent();
  }, []);

  if (eventData && !isEventLoaded) {
    const currentEvent = eventData.getEvent as EventInterface;
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

  if (eventError) {
    errorMessage = eventError.message;
  }
  // End Loading Event

  // Updating Event
  if (updateErrorMessage) {
    errorMessage = updateErrorMessage;
  }

  if (updatedEventData) {
    return <Redirect to={EVENTS_URL} />;
  }
  // End Updating Event

  return (
    <CommonEventForm
      title='Edit'
      name={name}
      hasNameError={hasNameError}
      nameErrorMessage={nameErrorMessage}
      onNameChange={onNameChange}
      notes={notes}
      onNotesChange={onNotesChange}
      date={date}
      onDateChange={onDateChange}
      formTouched={formTouched}
      submitButtonEnabled={submitButtonEnabled}
      formErrorMessage={errorMessage}
      loading={loading}
      submitBtnTitle='Save'
      submitFn={() => {
        return updateEventAsync(props.id, name, date, notes);
      }}
    />
  );
};

export default EditEventForm;
