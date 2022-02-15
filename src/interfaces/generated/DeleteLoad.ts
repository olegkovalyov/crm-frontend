/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoadStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteLoad
// ====================================================

export interface DeleteLoad_deleteLoad_slots {
  __typename: "SlotModel";
  id: number;
}

export interface DeleteLoad_deleteLoad {
  __typename: "LoadModel";
  id: number;
  status: LoadStatus;
  capacity: number;
  order: number;
  slots: DeleteLoad_deleteLoad_slots[];
  info: string;
  createdAt: any;
  updatedAt: any;
}

export interface DeleteLoad {
  deleteLoad: DeleteLoad_deleteLoad;
}

export interface DeleteLoadVariables {
  id: number;
}
