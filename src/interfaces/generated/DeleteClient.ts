/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, ClientRole, ClientStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteClient
// ====================================================

export interface DeleteClient_deleteClient {
  __typename: "ClientModel";
  id: number;
  userId: number;
  address: string;
  age: number;
  certificate: string | null;
  createdAt: any;
  email: string | null;
  firstName: string;
  gender: Gender;
  lastName: string;
  notes: string | null;
  phone: string;
  processedAt: any | null;
  role: ClientRole;
  status: ClientStatus;
  updatedAt: any;
  weight: number;
  withCameraman: boolean;
  withHandCameraVideo: boolean;
}

export interface DeleteClient {
  deleteClient: DeleteClient_deleteClient;
}

export interface DeleteClientVariables {
  input: number;
}
