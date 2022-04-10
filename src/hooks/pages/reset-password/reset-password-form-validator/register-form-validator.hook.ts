import { useEffect, useState } from 'react';
import { validateInput } from '../../../../validators/base/input.validator';
export const useResetPasswordFormValidator = () => {

  const [password, setPassword] = useState('');
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  const [resetPasswordButtonDisabled, setResetPasswordButtonDisabled] = useState(true);

  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (!hasPasswordError
      && !hasConfirmPasswordError
      && password.length
      && confirmPassword.length
    ) {
      setResetPasswordButtonDisabled(false);
    } else {
      setResetPasswordButtonDisabled(true);
    }
  }, [
    hasPasswordError,
    hasConfirmPasswordError,
    password,
    confirmPassword,
  ]); // eslint-disable-line


  const onPasswordChange = (value: string): void => {
    setFormTouched(true);
    // validateInput(value, setPassword, setPasswordErrorMessage, setHasPasswordError, passwordConstrains);
  };

  const onConfirmPasswordChange = (value: string): void => {
    setFormTouched(true);
    // validatePasswordsEquality({
    //   password,
    //   confirmPassword: value,
    // },
    //   setConfirmPassword,
    //   setConfirmPasswordErrorMessage,
    //   setHasConfirmPasswordError,
    //   passwordsEqualConstraints
    // );
  };

  return {
    onPasswordChange,
    onConfirmPasswordChange,
    password,
    hasPasswordError,
    confirmPassword,
    hasConfirmPasswordError,
    confirmPasswordErrorMessage,
    passwordErrorMessage,
    formTouched,
    resetPasswordButtonDisabled,
  };

};
