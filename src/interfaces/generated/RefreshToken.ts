/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RefreshToken
// ====================================================

export interface RefreshToken_refreshToken_user {
  __typename: "UserModel";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  licenseType: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RefreshToken_refreshToken {
  __typename: "AuthModel";
  user: RefreshToken_refreshToken_user | null;
  accessToken: string | null;
}

export interface RefreshToken {
  refreshToken: RefreshToken_refreshToken;
}
