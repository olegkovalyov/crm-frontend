/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSlotInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSlot
// ====================================================

export interface CreateSlot_createSlot {
  __typename: "SlotModel";
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  description: string;
}

export interface CreateSlot {
  createSlot: CreateSlot_createSlot;
}

export interface CreateSlotVariables {
  input: CreateSlotInput;
}
