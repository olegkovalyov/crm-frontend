/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ClientRole, ClientStatus, Gender } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClient
// ====================================================

export interface GetClient_getClient {
  __typename: "ClientModel";
  id: number;
  userId: number;
  role: ClientRole;
  status: ClientStatus;
  gender: Gender;
  age: number;
  firstName: string;
  lastName: string;
  email: string | null;
  weight: number;
  phone: string;
  address: string;
  withHandCameraVideo: boolean;
  withCameraman: boolean;
  notes: string | null;
  certificate: string | null;
  createdAt: any;
  updatedAt: any;
  processedAt: any | null;
}

export interface GetClient {
  getClient: GetClient_getClient | null;
}

export interface GetClientVariables {
  id: number;
}
