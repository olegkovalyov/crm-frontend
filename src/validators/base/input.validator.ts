import validate from 'validate.js';
import { ValidationResultInterface } from '../../interfaces/validator.interface';

export const validateInput = (
  value: string,
  constraints: Object,
): ValidationResultInterface => {
  const validationResult: string[] | undefined = validate.single(value, constraints);
  if (validationResult !== undefined) {
    const validationMessage = validationResult.shift();
    return {
      isValid: false,
      validationMessage,
    };
  }

  return {
    isValid: true,
    validationMessage: '',
  };
};
