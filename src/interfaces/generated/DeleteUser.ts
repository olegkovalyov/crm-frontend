/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUser
// ====================================================

export interface DeleteUser_removeUser {
  __typename: "UserModel";
  id: string;
}

export interface DeleteUser {
  removeUser: DeleteUser_removeUser | null;
}

export interface DeleteUserVariables {
  input: string;
}
