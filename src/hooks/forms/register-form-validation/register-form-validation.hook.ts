import { useEffect, useState } from 'react';
import {
  emailConstraints,
  firstNameConstrains,
  lastNameConstrains,
  passwordConstrains,
  validateInput,
} from '../../../common/inputValidator';
import { passwordsEqualConstraints, validatePasswordsEquality } from '../../../common/passwordsEqualValidator';

export const useRegisterFormValidation = () => {

  const [firstName, setFirstName] = useState('');
  const [hasFirstNameError, setHasFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');

  const [lastName, setLastName] = useState('');
  const [hasLastNameError, setHasLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(true);

  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (!hasEmailError
      && !hasPasswordError
      && !hasConfirmPasswordError
      && !hasFirstNameError
      && !hasLastNameError
      && email.length
      && password.length
      && firstName.length
      && lastName.length
      && confirmPassword.length
    ) {
      setRegisterButtonDisabled(false);
    } else {
      setRegisterButtonDisabled(true);
    }
  }, [
    hasEmailError,
    hasPasswordError,
    hasConfirmPasswordError,
    hasFirstNameError,
    hasLastNameError,
    email,
    password,
    confirmPassword,
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

  const onPasswordChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setPassword, setPasswordErrorMessage, setHasPasswordError, passwordConstrains);
  };

  const onConfirmPasswordChange = (value: string): void => {
    setFormTouched(true);
    validatePasswordsEquality({
      password,
      confirmPassword: value,
    }, setConfirmPassword, setConfirmPasswordErrorMessage, setHasConfirmPasswordError, passwordsEqualConstraints);
  };

  return {
    onEmailChange,
    onFirstNameChange,
    onLastNameChange,
    onPasswordChange,
    onConfirmPasswordChange,
    email,
    hasEmailError,
    emailErrorMessage,
    password,
    hasPasswordError,
    confirmPassword,
    hasConfirmPasswordError,
    confirmPasswordErrorMessage,
    passwordErrorMessage,
    firstName,
    hasFirstNameError,
    firstNameErrorMessage,
    lastName,
    hasLastNameError,
    lastNameErrorMessage,
    formTouched,
    registerButtonDisabled,
  };

};
