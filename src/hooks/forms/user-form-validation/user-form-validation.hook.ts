import React, { useEffect, useState, useCallback } from 'react';
import {
  emailConstraints,
  firstNameConstrains,
  lastNameConstrains,
  validateInput,
} from '../../../common/inputValidator';
import {
  LICENSE_NONE,
  RolesType,
  USER_STATUS_ACTIVE, USER_STATUS_BLOCKED,
  userRoles,
  UserStatusType,
} from '../../../constants/user.constants';
import { RoleCheckBoxesStateType } from '../../../components/users/common-user-form/common-user-form.component';

export const useUserFormValidation = () => {

  const setUser = (
    status: UserStatusType,
    firstName: string,
    lastName: string,
    email: string,
    roles: RolesType[],
    licenseType: string,
  ): void => {
    setStatus(status);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setRoles(roles);
    setLicenseType(licenseType);
    userRoles.forEach((value) => {
      initialRoleCheckboxesState[value] = roles.includes(value);
    });
    setRoleCheckboxesState(initialRoleCheckboxesState);
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

  const [licenseType, setLicenseType] = useState(LICENSE_NONE);

  const [roles, setRoles] = useState<RolesType[]>([]);

  const initialRoleCheckboxesState: RoleCheckBoxesStateType = {};
  userRoles.forEach((value) => {
    initialRoleCheckboxesState[value] = roles.includes(value);
  });
  const [roleCheckBoxesState, setRoleCheckboxesState] = useState<RoleCheckBoxesStateType>(initialRoleCheckboxesState);

  const [status, setStatus] = useState<UserStatusType>(USER_STATUS_ACTIVE);

  const getSelectedRoles = useCallback( (): RolesType[] => {
    const selectedRoles: RolesType[] = [];
    userRoles.forEach(value => {
      if (roleCheckBoxesState[value] === true) {
        selectedRoles.push(value);
      }
    });
    return selectedRoles;
  }, [roleCheckBoxesState]);

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
    setLicenseType(event.target.value as string);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleCheckboxesState(prevState => {
      const newFormRolesState = { ...prevState };
      newFormRolesState[e.target.value as RolesType] = e.target.checked;
      return newFormRolesState;
    });
  };

  const handleIsActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setStatus(USER_STATUS_ACTIVE) : setStatus(USER_STATUS_BLOCKED);
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
  };

};
