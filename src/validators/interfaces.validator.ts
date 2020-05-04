export interface IValidationResult {
  error: boolean,
  message: string,
}

export interface IEmailValidationResult {
  email: string[]
}

export interface IPasswordValidationResult {
  password: string[]
}
