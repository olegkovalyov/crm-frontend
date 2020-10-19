import React, { FC, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { useEventFormValidation } from '../../../hooks/forms/event-form-validation/event-form-validation.hook';
import CommonEventForm from '../common-event-form/common-event-form.component';
import { useCreateEventRequest } from '../../../hooks/graphql/create-event-request/create-event-request.hook';
import { EVENTS_URL } from '../../../constants/route.constants';


interface PropTypes {
  children?: never,
}

const CreateEventForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
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
  } = useEventFormValidation();

  const {
    createEventAsync,
    createEventData,
    loading,
    errorMessage,
  } = useCreateEventRequest();

  if (createEventData) {
    return (<Redirect to={EVENTS_URL} />);
  }

  return (
    <CommonEventForm
      title='Create'
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
      submitBtnTitle='Create'
      submitFn={() => {
        return createEventAsync(name, date, notes);
      }}
    />
  );
};

export default CreateEventForm;
