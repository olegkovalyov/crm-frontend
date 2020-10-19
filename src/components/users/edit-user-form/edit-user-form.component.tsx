import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useUserFormValidation } from '../../../hooks/forms/user-form-validation/user-form-validation.hook';
import { useGetUserRequest } from '../../../hooks/graphql/get-user-request/get-user-request.hook';
import LoadBackdrop from '../../../elements/backdrop.component';
import { useUpdateUserRequest } from '../../../hooks/graphql/update-user-request/update-user-request.hook';
import CommonUserForm from '../common-user-form/common-user-form.component';
import { USERS_URL } from '../../../constants/route.constants';
import { USER_STATUS_ACTIVE } from '../../../constants/user.constants';
import { UserInterface } from '../../../interfaces/user.interface';

interface PropTypes {
  id: string;
}

const EditUserForm: FC<PropTypes> = (props: PropTypes): ReactElement => {
  let errorMessage = '';

  const [isUserLoaded, setIsUserLoaded] = useState(false);

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
    setUser,
  } = useUserFormValidation();

  const { isUserLoading, userError, userData, getUser } = useGetUserRequest(props.id);

  const { loading, updateErrorMessage, updatedUserData, updateUserAsync } = useUpdateUserRequest();

  // Loading User
  useEffect(() => {
    getUser();
  }, [getUser]);

  if (userData && !isUserLoaded) {
    const currentUser = userData.getUser as UserInterface;
    if (currentUser !== null) {
      setUser(
        currentUser.status,
        currentUser.firstName,
        currentUser.lastName,
        currentUser.email,
        currentUser.roles,
        currentUser.licenseType!,
      );
      setIsUserLoaded(true);
    } else {
      return <Redirect to={USERS_URL} />;
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
    return <Redirect to={USERS_URL} />;
  }
  // End Updating User

  return (
    <>
      <CommonUserForm
        title="Edit"
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
        isActive={status === USER_STATUS_ACTIVE}
        onIsActiveChange={handleIsActiveChange}
        formTouched={formTouched}
        submitButtonEnabled={submitButtonEnabled}
        formErrorMessage={errorMessage}
        loading={loading}
        submitFn={() => {
          return updateUserAsync(
            props.id,
            status,
            firstName,
            lastName,
            email,
            null,
            getSelectedRoles(),
            licenseType);
        }}
      />
    </>
  );
};

export default EditUserForm;
