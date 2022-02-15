/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSlotInput, SlotType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSlot
// ====================================================

export interface CreateSlot_createSlot {
  __typename: "SlotModel";
  id: number;
  type: SlotType;
  personIds: string[];
  info: string;
}

export interface CreateSlot {
  createSlot: CreateSlot_createSlot;
}

export interface CreateSlotVariables {
  slot: CreateSlotInput;
}
