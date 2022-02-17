/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoadStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetLoad
// ====================================================

export interface GetLoad_getLoad_slots {
  __typename: "SlotModel";
  id: number;
}

export interface GetLoad_getLoad {
  __typename: "LoadModel";
  id: number;
  status: LoadStatus;
  capacity: number;
  order: number;
  slots: GetLoad_getLoad_slots[];
  info: string;
  takeOffTime: any | null;
  landingTime: any | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetLoad {
  getLoad: GetLoad_getLoad | null;
}

export interface GetLoadVariables {
  id: number;
}
