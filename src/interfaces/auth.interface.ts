export interface ICurrentUser {
  _id: string,
  name: string,
  email: string,
}

export interface IAuthLoginRequestData {
  email: string,
  password: string,
}

export interface IAuthLoginResponseData {
  currentUser: ICurrentUser | null,
  token: string | null,
}

export interface IAuthErrorResponseData {
  errorCode: number
}
