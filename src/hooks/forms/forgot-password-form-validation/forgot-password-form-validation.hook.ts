import { useEffect, useState } from 'react';
import { emailConstraints, validateInput } from '../../../common/inputValidator';

export const useForgotPasswordFormValidation = () => {
  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [formTouched, setFormTouched] = useState(false);

  const [resetButtonDisabled, setResetButtonDisabled] = useState(true);


  useEffect(() => {
    if (!hasEmailError
      && email.length
    ) {
      setResetButtonDisabled(false);
    } else {
      setResetButtonDisabled(true);
    }
  }, [hasEmailError, email]); // eslint-disable-line


  const onEmailChange = (value: string): void => {
    setFormTouched(true);
    validateInput(value, setEmail, setEmailErrorMessage, setHasEmailError, emailConstraints);
  };

  return {
    onEmailChange,
    formTouched,
    email,
    hasEmailError,
    emailErrorMessage,
    resetButtonDisabled,
  };
};
