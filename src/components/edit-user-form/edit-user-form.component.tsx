import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useUserFormValidation } from '../../hooks/user-form-validation/user-form-validation.hook';
import { useGetUserRequest } from '../../hooks/get-user-request/get-user-request.hook';
import LoadBackdrop from '../../elements/backdrop.component';
import { url } from '../../constants/url';
import { useUpdateUserRequest } from '../../hooks/update-user-request/update-user-request.hook';
import CommonUserForm from '../common-user-form/common-user-form.component';

interface PropTypes {
  id: string,
  children?: never,
}

const EditUserForm: FC<PropTypes> = (props: PropTypes): ReactElement => {

  let errorMessage = '';

  const [needPopulateColumns, setNeedPopulateColumns] = useState(true);

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
    role,
    onRoleChange,
    formTouched,
    saveButtonDisabled,
    setUser,
  } = useUserFormValidation();

  const {
    isUserLoading,
    userError,
    userData,
    getUser,
  } = useGetUserRequest(props.id);

  const {
    loading,
    updateErrorMessage,
    updatedUserData,
    updateUserAsync,
  } = useUpdateUserRequest();

  // Loading User
  useEffect(() => {
    getUser();
  }, [getUser]);

  if (userData
    && needPopulateColumns
  ) {
    const currentUser = userData.getUser;
    if (currentUser !== null) {
      setUser(currentUser.firstName,
        currentUser.lastName,
        currentUser.email,
        currentUser.role,
        currentUser.licenseType!);
      setNeedPopulateColumns(false);
    } else {
      return (<Redirect to={url.users} />);
    }
  }

  if (isUserLoading) {
    return (
      <>
        <LoadBackdrop isOpen={true} />
      </>
    );
  }

  if (userError) {
    errorMessage = userError.message;
  }
  // End Loading User

  // Updating User
  if (updateErrorMessage) {
    errorMessage = updateErrorMessage;
  }

  if (updatedUserData) {
    return (<Redirect to={url.users} />);
  }
  // End Updating User


  return (
    <>
      <CommonUserForm
        title='Edit'
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
        role={role}
        onRoleChange={onRoleChange}
        formTouched={formTouched}
        submitButtonDisabled={saveButtonDisabled}
        formErrorMessage={errorMessage}
        loading={loading}
        submitFn={() => {
          return updateUserAsync(
            props.id,
            firstName,
            lastName,
            email,
            null,
            role,
            licenseType,
          );
        }}
      />
    </>
  );
};

export default EditUserForm;
