import { GetUser_getUser } from './generated/GetUser';
import { RolesType, UserStatusType } from '../constants/user.constants';

export interface UserInterface extends GetUser_getUser {
  status: UserStatusType;
  roles: RolesType[];
}

export type RoleCheckBoxesStateType = {
  [key in RolesType]?: boolean
};

