import { LicenseType, UserRole, UserStatus } from '../interfaces/generated/globalTypes';

export const userRoles = [
  UserRole.STUDENT,
  UserRole.SKYDIVER,
  UserRole.COACH,
  UserRole.TM,
  UserRole.CAMERAMAN,
  UserRole.PACKER,
  UserRole.RIGGER,
  UserRole.MANIFEST,
  UserRole.ADMIN,
];

export const staffRoles = [
  UserRole.COACH,
  UserRole.TM,
  UserRole.CAMERAMAN,
  UserRole.PACKER,
];


export const licenseTypes = [
  LicenseType.NONE,
  LicenseType.A,
  LicenseType.B,
  LicenseType.C,
  LicenseType.D,
];

export const userStatuses = [
  UserStatus.ACTIVE,
  UserStatus.BLOCKED,
];
