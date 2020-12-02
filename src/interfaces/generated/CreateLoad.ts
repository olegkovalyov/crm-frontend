/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateLoadInput, LoadStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateLoad
// ====================================================

export interface CreateLoad_createLoad_slots {
  __typename: "SlotModel";
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  description: string;
}

export interface CreateLoad_createLoad {
  __typename: "LoadModel";
  id: number;
  status: LoadStatus;
  order: number;
  date: any;
  aircraft: string;
  notes: string | null;
  slots: CreateLoad_createLoad_slots[];
}

export interface CreateLoad {
  createLoad: CreateLoad_createLoad;
}

export interface CreateLoadVariables {
  input: CreateLoadInput;
}
