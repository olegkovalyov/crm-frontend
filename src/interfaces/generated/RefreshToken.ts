/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RefreshToken
// ====================================================

export interface RefreshToken_refreshToken_payload {
  __typename: "UserModel";
  id: number;
  firstName: string;
  lastName: string;
}

export interface RefreshToken_refreshToken {
  __typename: "AuthModel";
  payload: RefreshToken_refreshToken_payload | null;
  accessToken: string | null;
}

export interface RefreshToken {
  refreshToken: RefreshToken_refreshToken;
}
