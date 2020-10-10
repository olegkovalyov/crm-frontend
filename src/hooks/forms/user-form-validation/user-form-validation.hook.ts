import React, { useEffect, useState } from 'react';
import {
  emailConstraints,
  firstNameConstrains,
  lastNameConstrains,
  validateInput,
} from '../../../common/inputValidator';
import { LICENSE_NONE, RolesType } from '../../../constants/user.constants';

export const useUserFormValidation = () => {

  const setUser = (
    firstName: string,
    lastName: string,
    email: string,
    roles: RolesType[],
    licenseType: string,
  ): void => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setRoles(roles);
    setLicenseType(licenseType);
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

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  const [formTouched, setFormTouched] = useState(false);

  const [licenseType, setLicenseType] = useState(LICENSE_NONE);

  const [roles, setRoles] = useState<RolesType[]>([]);


  useEffect(() => {
    if (!hasEmailError
      && !hasFirstNameError
      && !hasLastNameError
      && email.length
      && firstName.length
      && lastName.length
    ) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
    }
  }, [
    hasEmailError,
    hasFirstNameError,
    hasLastNameError,
    email,
    firstName,
    lastName,
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
    setLicenseType(event.target.value as string);
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
    roles,
    formTouched,
    saveButtonDisabled,
    setUser,
  };

};
