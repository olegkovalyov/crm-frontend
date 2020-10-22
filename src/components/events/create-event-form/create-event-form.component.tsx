import React, { FC, ReactElement, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useEventFormValidation } from '../../../hooks/forms/event-form-validation/event-form-validation.hook';
import CommonEventForm from '../common-event-form/common-event-form.component';
import { useCreateEventMutation } from '../../../hooks/graphql/mutations/create-event/create-event.mutation.hook';
import { EVENTS_URL } from '../../../constants/route.constants';
import { useUsersList } from '../../../hooks/forms/users-list/users-list.hook';
import { useGetStaffQuery } from '../../../hooks/graphql/queries/get-staff/get-staff.query.hook';


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
    inProcessOfCreatingEvent,
    createEventErrorMessage,
    eventsData,
    createEventAsync,
  } = useCreateEventMutation();

  const {
    isLoadingStaff,
    staffData,
    getStaffErrorMessage,
    getStaffAsync,
  } = useGetStaffQuery();

  useEffect(() => {
    getStaffAsync();
  }, []);

  const {
    selectedUsers: selectedStaff,
    handleChangeUsersList: handleChangeStaffList,
  } = useUsersList();

  const isLoading = (isLoadingStaff || inProcessOfCreatingEvent);


  if (createEventErrorMessage) {
    errorMessage = createEventErrorMessage;
  } else if (getStaffErrorMessage) {
    errorMessage = getStaffErrorMessage;
  }


  if (eventsData) {
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
      users={staffData}
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
