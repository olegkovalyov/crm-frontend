import React, { FC, ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { useUserFormValidation } from '../../../hooks/forms/user-form-validation/user-form-validation.hook';
import { useCreateUserRequest } from '../../../hooks/graphql/create-user-request/create-user-request.hook';
import CommonUserForm from '../common-user-form/common-user-form.component';
import { USERS_URL } from '../../../constants/route.constants';
import { UserStatus } from '../../../interfaces/generated/globalTypes';

interface PropTypes {
  children?: never,
}

const CreateUserForm: FC<PropTypes> = (props: PropTypes): ReactElement => {

  const {
    firstName,
    onFirstNameChange,
    hasFirstNameError,
    firstNameErrorMessage,
    lastName,
    onLastNameChange,
    hasLastNameError,
    lastNameErrorMessage,
    email,
    onEmailChange,
    hasEmailError,
    emailErrorMessage,
    licenseType,
    onLicenceTypeChange,
    roleCheckBoxesState,
    handleRoleChange,
    getSelectedRoles,
    status,
    handleIsActiveChange,
    formTouched,
    submitButtonEnabled,
  } = useUserFormValidation();

  const {
    loading,
    createUserAsync,
    createUserData,
    errorMessage,
  } = useCreateUserRequest();


  if (createUserData) {
    return (<Redirect to={USERS_URL} />);
  }

  return (
    <>
      <CommonUserForm
        title='Create'
        firstName={firstName}
        hasFirstNameError={hasFirstNameError}
        firstNameErrorMessage={firstNameErrorMessage}
        onFirstNameChange={onFirstNameChange}
        lastName={lastName}
        hasLastNameError={hasLastNameError}
        lastNameErrorMessage={lastNameErrorMessage}
        onLastNameChange={onLastNameChange}
        email={email}
        hasEmailError={hasEmailError}
        emailErrorMessage={emailErrorMessage}
        onEmailChange={onEmailChange}
        licenseType={licenseType}
        onLicenseTypeChange={onLicenceTypeChange}
        roleCheckBoxesState={roleCheckBoxesState}
        onRoleChange={handleRoleChange}
        isActive={status === UserStatus.ACTIVE}
        onIsActiveChange={handleIsActiveChange}
        formTouched={formTouched}
        submitButtonEnabled={submitButtonEnabled}
        formErrorMessage={errorMessage}
        loading={loading}
        submitFn={() => {
          return createUserAsync(
            status,
            firstName,
            lastName,
            email,
            'password',
            getSelectedRoles(),
            licenseType);
        }}
      />
    </>
  );
};

export default CreateUserForm;
