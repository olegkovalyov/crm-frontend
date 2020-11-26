/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateClientInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateClient
// ====================================================

export interface CreateClient_createClient {
  __typename: "ClientModel";
  id: number;
}

export interface CreateClient {
  createClient: CreateClient_createClient;
}

export interface CreateClientVariables {
  input: CreateClientInput;
}
