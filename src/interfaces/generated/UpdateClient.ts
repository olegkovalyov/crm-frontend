/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateClientInput, ClientRole, ClientStatus, PaymentStatus, Gender } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateClient
// ====================================================

export interface UpdateClient_updateClient {
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

export interface UpdateClient {
  updateClient: UpdateClient_updateClient;
}

export interface UpdateClientVariables {
  client: UpdateClientInput;
}
