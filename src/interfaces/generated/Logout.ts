/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Logout
// ====================================================

export interface Logout_logout_user {
  __typename: "MemberModel";
  email: string;
}

export interface Logout_logout {
  __typename: "AuthModel";
  user: Logout_logout_user | null;
  accessToken: string | null;
}

export interface Logout {
  logout: Logout_logout;
}
