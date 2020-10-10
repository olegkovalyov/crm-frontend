import { GetUser_getUser } from './generated/GetUser';
import { RolesType } from '../constants/user.constants';

export interface UserInterface extends GetUser_getUser {
  roles: RolesType[];
}

