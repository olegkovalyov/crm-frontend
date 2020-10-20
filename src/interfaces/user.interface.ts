import { GetUser_getUser } from './generated/GetUser';
import { UserRole, UserStatus } from './generated/globalTypes';

export interface UserInterface extends GetUser_getUser {

}

export type RoleCheckBoxesStateType = {
  [key in UserRole]?: boolean
};

export type UserStatusCheckBoxesStateType = {
  [key in UserStatus]?: boolean
};

