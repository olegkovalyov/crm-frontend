import { LicenseType, MemberRole, MemberStatus } from '../interfaces/generated/globalTypes';

export const memberRoles = [
  MemberRole.STUDENT,
  MemberRole.SKYDIVER,
  MemberRole.COACH,
  MemberRole.TM,
  MemberRole.CAMERAMAN,
  MemberRole.PACKER,
  MemberRole.RIGGER,
  MemberRole.MANIFEST,
  MemberRole.ADMIN,
];

export const staffRoles = [
  MemberRole.COACH,
  MemberRole.TM,
  MemberRole.CAMERAMAN,
  MemberRole.PACKER,
];


export const licenseTypes = [
  LicenseType.NONE,
  LicenseType.A,
  LicenseType.B,
  LicenseType.C,
  LicenseType.D,
];

export const memberStatuses = [
  MemberStatus.ACTIVE,
  MemberStatus.BLOCKED,
];
