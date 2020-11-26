/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMemberInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateMember
// ====================================================

export interface CreateMember_createMember {
  __typename: "MemberModel";
  id: number;
}

export interface CreateMember {
  createMember: CreateMember_createMember;
}

export interface CreateMemberVariables {
  input: CreateMemberInput;
}
