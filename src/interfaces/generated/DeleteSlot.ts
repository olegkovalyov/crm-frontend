/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SlotType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteSlot
// ====================================================

export interface DeleteSlot_deleteSlot {
  __typename: "SlotModel";
  id: number;
  type: SlotType;
  personIds: string[];
  info: string;
}

export interface DeleteSlot {
  deleteSlot: DeleteSlot_deleteSlot;
}

export interface DeleteSlotVariables {
  id: number;
}
