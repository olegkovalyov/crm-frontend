/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetClientsInput, ClientRole, ClientStatus, PaymentStatus, Gender } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClients
// ====================================================

export interface GetClients_getClients {
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

export interface GetClients {
  getClients: GetClients_getClients[];
}

export interface GetClientsVariables {
  getClientsInput: GetClientsInput;
}
