import { useEffect, useState } from 'react';
import { emailConstraints, passwordConstrains, validateInput } from '../../common/inputValidator';

export const useLoginFormValidation = () => {
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
  }, [hasEmailError, hasPasswordError, email, password]);


  const onEmailChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setEmail, setEmailErrorMessage, setHasEmailError, emailConstraints);
  };

  const onPasswordChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setPassword, setPasswordErrorMessage, setHasPasswordError, passwordConstrains);
  };

  return {
    onEmailChange,
    onPasswordChange,
    formTouched,
    email,
    hasEmailError,
    emailErrorMessage,
    password,
    hasPasswordError,
    passwordErrorMessage,
    loginButtonDisabled
  };
};
