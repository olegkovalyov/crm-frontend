/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ClientRole, ClientStatus, PaymentStatus, Gender } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClient
// ====================================================

export interface GetClient_getClient {
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

export interface GetClient {
  getClient: GetClient_getClient;
}

export interface GetClientVariables {
  id: number;
}
