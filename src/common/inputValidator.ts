import React from 'react';
import validate from 'validate.js';


export const ageConstrains = {
  numericality: {
    onlyInteger: true,
    strict: true,
    greaterThan: 0,
    lessThanOrEqualTo: 100,
  },
};

export const weightConstrains = {
  numericality: {
    onlyInteger: true,
    strict: true,
    greaterThan: 40,
    lessThanOrEqualTo: 130,
  },
};

export const addressConstrains = {
  length: { maximum: 200 },
};

export const certificateConstrains = {
  length: { maximum: 40 },
};

export const phoneConstrains = {
  presence: { allowEmpty: false, message: 'phone can\'t be empty' },
  format: {
    pattern: '[0-9]+',
    flags: 'i',
    message: 'can only contain digits',
  },
  length: { minimum: 6, maximum: 20 },
};


export const emailConstraints = {
  presence: { allowEmpty: false, message: 'email can\'t be empty' },
  email: true,
};

export const firstNameConstrains = {
  presence: { allowEmpty: false, message: 'first name can\'t be empty' },
  format: {
    pattern: '[a-z.]+',
    flags: 'i',
    message: 'can only contain letters',
  },
  length: { minimum: 3, maximum: 20 },
};

export const eventNameConstrains = {
  presence: { allowEmpty: false, message: 'customBreadcrumbTitle name can\'t be empty' },
  format: {
    pattern: '[a-z. ]+',
    flags: 'i',
    message: 'Can only contain letters and spaces',
  },
  length: { minimum: 3, maximum: 30 },
};

export const lastNameConstrains = {
  presence: { allowEmpty: false, message: 'last name can\'t be empty' },
  format: {
    pattern: '[a-z.]+',
    flags: 'i',
    message: 'can only contain letters',
  },
  length: { minimum: 3, maximum: 20 },
};

export const passwordConstrains = {
  presence: { allowEmpty: false, message: 'password name can\'t be empty' },
  length: { minimum: 6, maximum: 20 },
};


export const validateInput = <T>(
  value: T,
  setValue: (state: React.SetStateAction<T>) => void,
  setValueErrorMessage: (state: React.SetStateAction<string>) => void,
  setHasError: (state: React.SetStateAction<boolean>) => void,
  constraints: Object,
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
