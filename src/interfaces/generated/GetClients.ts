/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ClientType, ClientStatus, Gender, PaymentStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetClients
// ====================================================

export interface GetClients_getClients_tm {
  __typename: "MemberModel";
  id: string;
  firstName: string;
  lastName: string;
}

export interface GetClients_getClients_cameraman {
  __typename: "MemberModel";
  id: string;
  firstName: string;
  lastName: string;
}

export interface GetClients_getClients {
  __typename: "ClientModel";
  id: string;
  type: ClientType;
  status: ClientStatus;
  age: number;
  weight: number;
  gender: Gender;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  address: string;
  withCameraman: boolean;
  withHandCameraVideo: boolean;
  paymentStatus: PaymentStatus;
  tm: GetClients_getClients_tm | null;
  cameraman: GetClients_getClients_cameraman | null;
  date: any | null;
  notes: string | null;
}

export interface GetClients {
  getClients: GetClients_getClients[];
}
