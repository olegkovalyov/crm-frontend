import { validate } from 'validate.js';
import { IEmailValidationResult, IValidationResult } from './interfaces.validator';


export const validateEmail = (email: string): IValidationResult => {

  const result: IValidationResult = {
    error: false,
    message: '',
  };

  const constraints = {
    email: {
      presence: true,
      email: true,
      length: {
        minimum: 6,
        message: 'Email must be at least 6 characters',
      },
    },
  };
  const validationResult: IEmailValidationResult | undefined = validate({ email }, constraints);

  if (validationResult !== undefined) {
    result.error = true;
    if (validationResult.email.length) {
      result.message = validationResult.email.shift()!;
    }
  }

  return result;

};
