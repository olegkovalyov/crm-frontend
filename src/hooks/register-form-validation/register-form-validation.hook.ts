import { useState } from 'react';
import { useLoginFormValidation } from '../login-form-validation/login-form-validation.hook';

export const useRegisterFormValidation = () => {

  const {
    onEmailChange,
    onPasswordChange,
    formTouched,
    email,
    hasEmailError,
    emailErrorMessage,
    password,
    hasPasswordError,
    passwordErrorMessage,
  } = useLoginFormValidation();

};
