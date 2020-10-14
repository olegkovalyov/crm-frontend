/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateUserInput {
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
  licenseType: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface GetUsersFilterInput {
  statuses?: string[] | null;
  roles?: string[] | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  password: string;
  token: string;
}

export interface UpdateUserInput {
  status?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  password?: string | null;
  roles?: string[] | null;
  licenseType?: string | null;
  id: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
