import React from 'react';
import validate from 'validate.js';

export interface IPasswordsEqualityConstraints {
  confirmPassword: {
    equality: string,
  },
}

export interface IPasswords {
  password: string,
  confirmPassword: string,
}

export interface IPasswordsEqualityResult {
  confirmPassword: string[]
}

export const passwordsEqualConstraints: IPasswordsEqualityConstraints = {
  confirmPassword: {
    equality: 'password',
  },
};


export const validatePasswordsEquality = (
  value: IPasswords,
  setValue: (state: React.SetStateAction<string>) => void,
  setValueErrorMessage: (state: React.SetStateAction<string>) => void,
  setHasError: (state: React.SetStateAction<boolean>) => void,
  constraints: IPasswordsEqualityConstraints,
): void => {
  setValue(value.confirmPassword);
  const validationResult: IPasswordsEqualityResult | undefined = validate(value, constraints);
  if (validationResult !== undefined) {
    const validationMessage = validationResult.confirmPassword.shift()!;
    setValueErrorMessage(validationMessage);
    setHasError(true);
    return;
  }
  setValueErrorMessage('');
  setHasError(false);
};
