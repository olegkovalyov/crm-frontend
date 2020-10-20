import React, { useEffect, useState } from 'react';
import {
  emailConstraints,
  firstNameConstrains,
  lastNameConstrains,
  validateInput,
} from '../../../common/inputValidator';
import { useRoles } from '../roles/roles.hook';
import { LicenseType, UserRole, UserStatus } from '../../../interfaces/generated/globalTypes';

export const useUserFormValidation = () => {

  const setUser = (
    status: UserStatus,
    firstName: string,
    lastName: string,
    email: string,
    roles: UserRole[],
    licenseType: LicenseType,
  ): void => {
    setStatus(status);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setLicenseType(licenseType);
    initCheckboxes(roles);
  };


  const [firstName, setFirstName] = useState('');
  const [hasFirstNameError, setHasFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');

  const [lastName, setLastName] = useState('');
  const [hasLastNameError, setHasLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [submitButtonEnabled, enableSubmitButton] = useState(false);

  const [formTouched, setFormTouched] = useState(false);

  const [licenseType, setLicenseType] = useState(LicenseType.NONE);

  const {
    roleCheckBoxesState,
    getSelectedRoles,
    handleRoleChange,
    initCheckboxes,
  } = useRoles();

  const [status, setStatus] = useState<UserStatus>(UserStatus.ACTIVE);

  useEffect(() => {
    if (!hasEmailError
      && !hasFirstNameError
      && !hasLastNameError
      && email.length
      && firstName.length
      && lastName.length
      && getSelectedRoles().length
    ) {
      enableSubmitButton(true);
    } else {
      enableSubmitButton(false);
    }
  }, [
    hasEmailError,
    hasFirstNameError,
    hasLastNameError,
    email,
    firstName,
    lastName,
    getSelectedRoles,
  ]);

  const onFirstNameChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setFirstName, setFirstNameErrorMessage, setHasFirstNameError, firstNameConstrains);
  };

  const onLastNameChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setLastName, setLastNameErrorMessage, setHasLastNameError, lastNameConstrains);
  };

  const onEmailChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setEmail, setEmailErrorMessage, setHasEmailError, emailConstraints);
  };

  const onLicenceTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormTouched(true);
    setLicenseType(event.target.value as LicenseType);
  };

  const handleIsActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setStatus(UserStatus.ACTIVE) : setStatus(UserStatus.BLOCKED);
  };

  return {
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
    initCheckboxes,
  };

};
