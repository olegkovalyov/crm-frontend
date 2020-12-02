/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSlotInput, LoadStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSlot
// ====================================================

export interface CreateSlot_createSlot_slots {
  __typename: "SlotModel";
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  description: string;
}

export interface CreateSlot_createSlot {
  __typename: "LoadModel";
  id: number;
  status: LoadStatus;
  order: number;
  date: any;
  aircraft: string;
  notes: string | null;
  slots: CreateSlot_createSlot_slots[];
}

export interface CreateSlot {
  createSlot: CreateSlot_createSlot;
}

export interface CreateSlotVariables {
  input: CreateSlotInput;
}
