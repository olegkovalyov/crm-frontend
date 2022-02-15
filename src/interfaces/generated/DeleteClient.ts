/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ClientRole, ClientStatus, PaymentStatus, Gender } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteClient
// ====================================================

export interface DeleteClient_deleteClient {
  __typename: "ClientModel";
  id: number;
  personId: string;
  role: ClientRole;
  status: ClientStatus;
  paymentStatus: PaymentStatus;
  gender: Gender;
  dateOfBirth: any;
  firstName: string;
  lastName: string;
  email: string | null;
  weight: number;
  phone: string;
  certificate: string | null;
  createdAt: any;
  updatedAt: any;
  processedAt: any | null;
}

export interface DeleteClient {
  deleteClient: DeleteClient_deleteClient;
}

export interface DeleteClientVariables {
  id: number;
}
