export const LOGIN_URL = '/login';
export const REGISTER_URL = '/register';
export const FORGOT_PASSWORD_URL = '/forgot-password';
export const RESET_PASSWORD_URL = '/reset-password/:token';

export const HOME_URL = '/';
// Dashboard
export const DASHBOARD_URL = '/dashboard';
// Manage
export const MEMBERS_URL = '/members';
export const CREATE_MEMBER_URL = '/members/create';
export const EDIT_MEMBER_URL = '/members/:id';
export const MANAGE_INVENTORY_URL = '/inventory';

// Events
export const EVENTS_URL = '/events';
export const CREATE_EVENT_URL = '/events/create';
export const EDIT_EVENT_URL = '/events/:id';
export const HISTORY_URL = '/history';
export const LOADS_URL = '/events/:id/loads';

// Clients
export const CLIENTS_URL = '/clients';
export const CREATE_CLIENT_URL = '/clients/create';
export const EDIT_CLIENT_URL = '/clients/:id';

// Loads

// Settings
export const SETTINGS_URL = '/settings';

export const NO_MATCH_URL = '*';


export const breadcrumbsMap: { [key: string]: string } = {
  [DASHBOARD_URL]: 'Dashboard',
  [MEMBERS_URL]: 'Members',
  [CREATE_MEMBER_URL]: 'Create',
  [MANAGE_INVENTORY_URL]: 'Inventory',
  [SETTINGS_URL]: 'Settings',
  [EVENTS_URL]: 'Events',
  [CREATE_EVENT_URL]: 'Create',
  [LOADS_URL]: 'Loads',
  [HISTORY_URL]: 'History',
  [CLIENTS_URL]: 'Clients',
  [CREATE_CLIENT_URL]: 'Create',
};

export const routePaths = [
  HOME_URL,
  DASHBOARD_URL,
  MEMBERS_URL,
  CREATE_MEMBER_URL,
  EDIT_MEMBER_URL,
  MANAGE_INVENTORY_URL,
  SETTINGS_URL,
  EVENTS_URL,
  LOADS_URL,
  CREATE_EVENT_URL,
  EDIT_EVENT_URL,
  HISTORY_URL,
  CLIENTS_URL,
  CREATE_CLIENT_URL,
  EDIT_CLIENT_URL,
];

