/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoadStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteSlot
// ====================================================

export interface DeleteSlot_deleteSlot_slots {
  __typename: "SlotModel";
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  description: string;
}

export interface DeleteSlot_deleteSlot {
  __typename: "LoadModel";
  id: number;
  status: LoadStatus;
  order: number;
  date: any;
  aircraft: string;
  notes: string | null;
  slots: DeleteSlot_deleteSlot_slots[];
}

export interface DeleteSlot {
  deleteSlot: DeleteSlot_deleteSlot;
}

export interface DeleteSlotVariables {
  id: number;
}
