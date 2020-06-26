// GraphQl
export interface IGraphQlError {
  message: string
}

export interface IDecodedJwtData {
  email: string,
  firstName: string,
  lastName: string,
  exp: number,
  iat: number,
  licenseType: string,
  role: string
}

