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
export const EDIT_USER_URL = '/users/edit/:id';
export const MANAGE_INVENTORY_URL = '/inventory';

// Events
export const EVENTS_URL = '/events';
export const CREATE_EVENT_URL = '/events/create';
export const EDIT_EVENT_URL = '/events/edit/:id';
export const HISTORY_URL = '/history';
export const LOADS_URL = '/events/:id/loads';

// Loads

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
  [LOADS_URL]: 'Loads',
  [CREATE_EVENT_URL]: 'Create',
  [EDIT_EVENT_URL]: 'Edit',
  [HISTORY_URL]: 'History',
};

export const routePaths = [
  HOME_URL,
  DASHBOARD_URL,
  USERS_URL,
  CREATE_USER_URL,
  EDIT_USER_URL,
  MANAGE_INVENTORY_URL,
  SETTINGS_URL,
  EVENTS_URL,
  LOADS_URL,
  CREATE_EVENT_URL,
  EDIT_EVENT_URL,
  HISTORY_URL,
];

