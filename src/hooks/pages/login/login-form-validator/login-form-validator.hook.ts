import { useEffect, useState } from 'react';
import { validateInput } from '../../../../validators/base/input.validator';
import { emailConstraint } from '../../../../validators/constraints/email.constraint';
import { passwordConstraint } from '../../../../validators/constraints/password.constraint';

export const useLoginFormValidator = () => {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [formTouched, setFormTouched] = useState(false);

  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);


  useEffect(() => {
    if (!hasEmailError
      && !hasPasswordError
      && email.length
      && password.length
    ) {
      setLoginButtonDisabled(false);
    } else {
      setLoginButtonDisabled(true);
    }
  }, [
    hasEmailError,
    hasPasswordError,
    email, password,
  ]);


  const handleEmailChange = (value: string): void => {
    const { isValid, validationMessage } = validateInput(value, emailConstraint);
    const hasError = isValid !== true;
    setFormTouched(true);
    setEmail(value);
    setHasEmailError(hasError);
    setEmailErrorMessage(validationMessage);
  };

  const handlePasswordChange = (value: string): void => {
    const { isValid, validationMessage } = validateInput(value, passwordConstraint);
    const hasError = isValid !== true;
    setFormTouched(true);
    setPassword(value);
    setHasPasswordError(hasError);
    setPasswordErrorMessage(validationMessage);
  };

  return {
    handleEmailChange,
    handlePasswordChange,
    formTouched,
    email,
    hasEmailError,
    emailErrorMessage,
    password,
    hasPasswordError,
    passwordErrorMessage,
    loginButtonDisabled,
  };
};
