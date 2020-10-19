export const LOGIN_URL = '/login';
export const REGISTER_URL = '/register';
export const FORGOT_PASSWORD_URL = '/forgot-password';
export const RESET_PASSWORD_URL = '/reset-password/:token';

export const HOME_URL = '/';
// Dashboard
export const DASHBOARD_URL = '/dashboard';
// Manage
export const USERS_URL = '/users';
export const CREATE_USER_URL = '/users/create';
export const EDIT_USER_URL = '/users/edit';
export const MANAGE_INVENTORY_URL = '/inventory';

// Events
export const EVENTS_URL = '/events';
export const CREATE_EVENT_URL = '/events/create';
export const EDIT_EVENT_URL = '/events/edit';
export const HISTORY_URL = '/history';

// Settings
export const SETTINGS_URL = '/settings';

export const NO_MATCH_URL = '*';


export const breadcrumbsMap: { [key: string]: string } = {
  [DASHBOARD_URL]: 'Dashboard',
  [USERS_URL]: 'Users',
  [CREATE_USER_URL]: 'Create',
  [EDIT_USER_URL]: 'Edit',
  [MANAGE_INVENTORY_URL]: 'Inventory',
  [SETTINGS_URL]: 'Settings',
  [EVENTS_URL]: 'Events',
  [CREATE_EVENT_URL]: 'Create',
  [EDIT_EVENT_URL]: 'Edit',
  [HISTORY_URL]: 'History',
};
