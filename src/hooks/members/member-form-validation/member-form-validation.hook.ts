import React, { useEffect, useState } from 'react';
import {
  emailConstraints,
  firstNameConstrains,
  lastNameConstrains,
  validateInput,
} from '../../../common/inputValidator';
import { LicenseType, MemberStatus } from '../../../interfaces/generated/globalTypes';
import { useRolesEdit } from '../roles-edit/roles-edit.hook';
import { UserInterface } from '../../../interfaces/member.interface';

export const useMemberFormValidation = () => {

  const setMember = (member: UserInterface): void => {
    setStatus(member.status);
    setFirstName(member.firstName);
    setLastName(member.lastName);
    setEmail(member.email);
    setLicenseType(member.licenseType);
    setSelectedRolesOptions(member.roles);
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

  const [status, setStatus] = useState<MemberStatus>(MemberStatus.ACTIVE);

  const {
    selectedRolesOptions,
    setSelectedRolesOptions,
    handleRolesChange,
  } = useRolesEdit();

  useEffect(() => {
    if (!hasEmailError
      && !hasFirstNameError
      && !hasLastNameError
      && email.length
      && firstName.length
      && lastName.length
      && selectedRolesOptions.length
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
    selectedRolesOptions,
  ]); // eslint-disable-line

  const handleFirstNameChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setFirstName, setFirstNameErrorMessage, setHasFirstNameError, firstNameConstrains);
  };

  const handleLastNameChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setLastName, setLastNameErrorMessage, setHasLastNameError, lastNameConstrains);
  };

  const handleEmailChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setEmail, setEmailErrorMessage, setHasEmailError, emailConstraints);
  };

  const handleLicenceTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormTouched(true);
    setLicenseType(event.target.value as LicenseType);
  };

  const handleIsActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setStatus(MemberStatus.ACTIVE) : setStatus(MemberStatus.BLOCKED);
  };

  return {
    firstName,
    handleFirstNameChange,
    hasFirstNameError,
    firstNameErrorMessage,
    lastName,
    handleLastNameChange,
    hasLastNameError,
    lastNameErrorMessage,
    email,
    handleEmailChange,
    hasEmailError,
    emailErrorMessage,
    licenseType,
    handleLicenceTypeChange,
    handleRolesChange,
    selectedRolesOptions,
    status,
    handleIsActiveChange,
    formTouched,
    submitButtonEnabled,
    setMember,
  };

};
