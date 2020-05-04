import { validate } from 'validate.js';
import { IPasswordValidationResult, IValidationResult } from './interfaces.validator';


export const validatePassword = (password: string): IValidationResult => {

  const result: IValidationResult = {
    error: false,
    message: '',
  };

  const constraints = {
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: 'Password must be at least 6 characters',
      },
    },
  };
  const validationResult: IPasswordValidationResult | undefined = validate({ password }, constraints);

  if (validationResult !== undefined) {
    result.error = true;
    if (validationResult.password.length) {
      result.message = validationResult.password.shift()!;
    }
  }

  return result;

};
