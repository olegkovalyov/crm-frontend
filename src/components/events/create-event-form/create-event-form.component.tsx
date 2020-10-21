import React, { FC, ReactElement, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useEventFormValidation } from '../../../hooks/forms/event-form-validation/event-form-validation.hook';
import CommonEventForm from '../common-event-form/common-event-form.component';
import { useCreateEventRequest } from '../../../hooks/graphql/create-event-request/create-event-request.hook';
import { EVENTS_URL } from '../../../constants/route.constants';
import { useUsersList } from '../../../hooks/forms/users-list/users-list.hook';
import { useQueryGetStaff } from '../../../hooks/graphql/query-get-staff/query-get-staff.hook';


interface PropTypes {
  children?: never,
}

const CreateEventForm: FC<PropTypes> = (props: PropTypes): ReactElement => {

  let errorMessage = '';
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
    loading: isCreatingEvent,
    errorMessage: errorCreatingEventMessage,
  } = useCreateEventRequest();

  const {
    loading: isStaffLoading,
    staff,
    getStaffAsync,
    error: errorStaffLoadingMessage,
  } = useQueryGetStaff();

  useEffect(() => {
    getStaffAsync();
  }, []);

  const {
    selectedUsers: selectedStaff,
    handleChangeUsersList: handleChangeStaffList,
  } = useUsersList();

  const isLoading = (isStaffLoading || isCreatingEvent);


  errorMessage = errorCreatingEventMessage || '';
  // errorMessage = errorStaffLoadingMessage || '';


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
      users={staff}
      selectedStaff={selectedStaff}
      onStaffChange={handleChangeStaffList}
      formTouched={formTouched}
      submitButtonEnabled={submitButtonEnabled}
      formErrorMessage={errorMessage}
      loading={isLoading}
      submitBtnTitle='Create'
      submitFn={() => {
        return createEventAsync(name, date, notes, selectedStaff);
      }}
    />
  );
};

export default CreateEventForm;
