/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateClientInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateClient
// ====================================================

export interface UpdateClient_updateClient {
  __typename: "ClientModel";
  id: number;
}

export interface UpdateClient {
  updateClient: UpdateClient_updateClient;
}

export interface UpdateClientVariables {
  input: UpdateClientInput;
}
