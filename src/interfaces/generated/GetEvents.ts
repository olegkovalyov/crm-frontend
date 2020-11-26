/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEventsFilterInput, MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_getEvents_staff {
  __typename: "MemberModel";
  id: number;
  userId: number;
  status: MemberStatus;
  firstName: string;
  lastName: string;
  email: string;
  roles: MemberRole[];
  licenseType: LicenseType | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetEvents_getEvents {
  __typename: "EventModel";
  id: number;
  name: string;
  date: any;
  staff: GetEvents_getEvents_staff[];
  notes: string;
}

export interface GetEvents {
  getEvents: GetEvents_getEvents[];
}

export interface GetEventsVariables {
  getEventsFilter: GetEventsFilterInput;
}
