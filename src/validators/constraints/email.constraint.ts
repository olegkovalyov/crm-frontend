export const emailConstraint = {
  presence: { allowEmpty: false, message: 'email can\'t be empty' },
  email: true,
};