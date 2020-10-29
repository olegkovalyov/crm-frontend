/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteClient
// ====================================================

export interface DeleteClient_deleteClient {
  __typename: "ClientModel";
  id: string;
}

export interface DeleteClient {
  deleteClient: DeleteClient_deleteClient | null;
}

export interface DeleteClientVariables {
  input: string;
}
