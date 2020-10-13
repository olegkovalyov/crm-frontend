/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_getUsers {
  __typename: "UserModel";
  id: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  licenseType: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsers {
  getUsers: (GetUsers_getUsers | null)[];
}
