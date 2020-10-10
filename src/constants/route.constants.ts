export const LOGIN_URL = '/login';
export const REGISTER_URL = '/register';
export const FORGOT_PASSWORD_URL = '/forgot-password';
export const RESET_PASSWORD_URL = '/reset-password/:token';

export const DASHBOARD_URL = '/dashboard';
export const MANAGE_USERS_URL = '/manage-users';
export const CREATE_USER_URL = '/manage-users/create';
export const EDIT_USER_URL = '/manage-users/edit/:id';
export const SETTINGS_URL = '/settings';
export const JUMPS_URL = '/jumps';
export const HISTORY_URL = '/history';

export const NO_MATCH_URL = '*';


export const breadcrumbsMap: { [key: string]: string } = {
  [DASHBOARD_URL]: 'Dashboard',
  [MANAGE_USERS_URL]: 'Users',
  [CREATE_USER_URL]: 'Create',
  [EDIT_USER_URL]: 'Edit',
  [SETTINGS_URL]: 'Settings',
  [JUMPS_URL]: 'Jumps',
  [HISTORY_URL]: 'History',
};
