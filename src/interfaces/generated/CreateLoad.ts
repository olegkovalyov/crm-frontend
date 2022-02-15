/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateLoadInput, LoadStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateLoad
// ====================================================

export interface CreateLoad_createLoad_slots {
  __typename: "SlotModel";
  id: number;
}

export interface CreateLoad_createLoad {
  __typename: "LoadModel";
  id: number;
  status: LoadStatus;
  capacity: number;
  order: number;
  slots: CreateLoad_createLoad_slots[];
  info: string;
  createdAt: any;
  updatedAt: any;
}

export interface CreateLoad {
  createLoad: CreateLoad_createLoad;
}

export interface CreateLoadVariables {
  load: CreateLoadInput;
}
