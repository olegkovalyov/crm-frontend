export const ageConstraint = {
  numericality: {
    onlyInteger: true,
    strict: true,
    greaterThan: 0,
    lessThanOrEqualTo: 100,
  },
};