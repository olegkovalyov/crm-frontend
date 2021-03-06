/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoadStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetLoad
// ====================================================

export interface GetLoad_getLoad_slots {
  __typename: "SlotModel";
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  description: string;
}

export interface GetLoad_getLoad {
  __typename: "LoadModel";
  id: number;
  status: LoadStatus;
  order: number;
  date: any;
  aircraft: string;
  notes: string | null;
  slots: GetLoad_getLoad_slots[];
}

export interface GetLoad {
  getLoad: GetLoad_getLoad | null;
}

export interface GetLoadVariables {
  id: number;
}
