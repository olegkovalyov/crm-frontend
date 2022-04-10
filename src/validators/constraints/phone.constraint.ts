export const phoneConstraint = {
  presence: { allowEmpty: false, message: 'phone can\'t be empty' },
  format: {
    pattern: '[0-9]+',
    flags: 'i',
    message: 'can only contain digits',
  },
  length: { minimum: 6, maximum: 20 },
};