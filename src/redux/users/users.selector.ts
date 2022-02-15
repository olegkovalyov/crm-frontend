import { RootStateInterface } from '../root.reducer';
import { UserRole, UserStatus } from '../../interfaces/generated/globalTypes';
import { UserInterface } from '../../interfaces/user.interface';

export const getUserRolesOptionsForFilter = (state: RootStateInterface): UserRole[] => state.users.rolesOptionsForFilter;

export const getUserStatusOptionsForFilter = (state: RootStateInterface): UserStatus[] => state.users.statusOptionsForFilter;

export const getUsers = (state: RootStateInterface): UserInterface[] => state.users.users;

