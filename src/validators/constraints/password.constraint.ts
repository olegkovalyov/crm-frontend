export const passwordConstraint = {
  presence: { allowEmpty: false, message: 'password name can\'t be empty' },
  length: { minimum: 6, maximum: 20 },
};