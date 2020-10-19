import React from 'react';
import validate from 'validate.js';

export interface IValidationConstraints {
  presence?: {
    allowEmpty?: boolean,
    message?: string
  },
  format?: {
    pattern: string,
    flags: string,
    message: string,
  }
  email?: boolean,
  length?: {
    minimum: number,
    maximum: number
  }
}


export const emailConstraints: IValidationConstraints = {
  presence: { allowEmpty: false, message: 'email can\'t be empty' },
  email: true,
};

export const firstNameConstrains: IValidationConstraints = {
  presence: { allowEmpty: false, message: 'first name can\'t be empty' },
  format: {
    pattern: '[a-z.]+',
    flags: 'i',
    message: 'can only contain letters',
  },
  length: { minimum: 3, maximum: 20 },
};

export const eventNameConstrains: IValidationConstraints = {
  presence: { allowEmpty: false, message: 'title name can\'t be empty' },
  format: {
    pattern: '[a-z. ]+',
    flags: 'i',
    message: 'Can only contain letters and spaces',
  },
  length: { minimum: 3, maximum: 30 },
};

export const lastNameConstrains: IValidationConstraints = {
  presence: { allowEmpty: false, message: 'last name can\'t be empty' },
  format: {
    pattern: '[a-z.]+',
    flags: 'i',
    message: 'can only contain letters',
  },
  length: { minimum: 3, maximum: 20 },
};

export const passwordConstrains: IValidationConstraints = {
  presence: { allowEmpty: false, message: 'password name can\'t be empty' },
  length: { minimum: 6, maximum: 20 },
};


export const validateInput = (
  value: string,
  setValue: (state: React.SetStateAction<string>) => void,
  setValueErrorMessage: (state: React.SetStateAction<string>) => void,
  setHasError: (state: React.SetStateAction<boolean>) => void,
  constraints: IValidationConstraints,
): void => {
  setValue(value);
  const validationResult: string[] | undefined = validate.single(value, constraints);
  if (validationResult !== undefined) {
    const validationMessage = validationResult.shift()!;
    setValueErrorMessage(validationMessage);
    setHasError(true);
    return;
  }
  setValueErrorMessage('');
  setHasError(false);
};
