export const ROLE_STUDENT = 'STUDENT';
export const ROLE_SKYDIVER = 'SKYDIVER';
export const ROLE_COACH = 'COACH';
export const ROLE_CAMERAMAN = 'CAMERAMAN';
export const ROLE_PACKER = 'PACKER';
export const ROLE_RIGGER = 'RIGGER';
export const ROLE_MANIFEST = 'MANIFEST';
export const ROLE_ADMIN = 'ADMIN';
export const ROLE_TM = 'TM';


export const userRoles: RolesType[] = [
  ROLE_STUDENT,
  ROLE_SKYDIVER,
  ROLE_COACH,
  ROLE_TM,
  ROLE_CAMERAMAN,
  ROLE_PACKER,
  ROLE_RIGGER,
  ROLE_MANIFEST,
  ROLE_ADMIN,
];

export type RolesType =
  'STUDENT' |
  'SKYDIVER' |
  'COACH' |
  'CAMERAMAN' |
  'TM' |
  'PACKER' |
  'RIGGER' |
  'MANIFEST' |
  'ADMIN';

export const LICENSE_NONE = 'NONE';
export const LICENSE_A = 'A';
export const LICENSE_B = 'B';
export const LICENSE_C = 'C';
export const LICENSE_D = 'D';

export const licenseTypes = [
  LICENSE_NONE,
  LICENSE_A,
  LICENSE_B,
  LICENSE_C,
  LICENSE_D,
];

export const USER_STATUS_ACTIVE = 'ACTIVE';
export const USER_STATUS_BLOCKED = 'BLOCKED';

export type UserStatusType = 'ACTIVE' | 'BLOCKED';

export const userStatuses: UserStatusType[] = [
  USER_STATUS_ACTIVE,
  USER_STATUS_BLOCKED,
];
