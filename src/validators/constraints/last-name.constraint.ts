export const lastNameConstraint = {
  presence: { allowEmpty: false, message: 'last name can\'t be empty' },
  format: {
    pattern: '[a-z.]+',
    flags: 'i',
    message: 'can only contain letters',
  },
  length: { minimum: 3, maximum: 20 },
};