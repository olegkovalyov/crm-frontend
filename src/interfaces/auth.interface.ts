export interface ICurrentUser {
  _id: string,
  name: string,
  email: string,
}

export interface IAuthLoginRequestData {
  email: string,
  password: string,
}

export interface IAuthRegisterRequestData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export interface IAuthSuccessResponseData {
  currentUser: ICurrentUser | null,
  token: string | null,
}

export interface IAuthErrorResponseData {
  errorCode: number
}
