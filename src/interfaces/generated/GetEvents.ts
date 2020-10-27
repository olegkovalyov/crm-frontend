/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MemberStatus, MemberRole, LicenseType } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetEvents
// ====================================================

export interface GetEvents_getEvents_loads {
  __typename: "LoadModel";
  id: string;
  aircraft: string;
  date: any;
  status: string;
}

export interface GetEvents_getEvents_staff {
  __typename: "MemberModel";
  id: string;
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
  id: string;
  name: string;
  date: any;
  notes: string;
  loads: GetEvents_getEvents_loads[];
  staff: GetEvents_getEvents_staff[];
}

export interface GetEvents {
  getEvents: GetEvents_getEvents[];
}
