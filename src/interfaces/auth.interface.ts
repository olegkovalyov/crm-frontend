// GraphQl
export interface IGraphQlError {
  message: string,
  extensions: {
    exception: {
      response: {
        message: string | string[],
      }
    }
  }
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

