export const ROUTE_LOG_IN = '/login';
export const ROUTE_REGISTER = '/register';
export const FORGOT_PASSWORD_URL = '/forgot-password';
export const RESET_PASSWORD_URL = '/reset-password';

export const HOME_URL = '/';

// Dashboard
export const ROUTE_DASHBOARD = '/dashboard';

// Members
export const USERS_URL = '/users';
export const CREATE_MEMBER_URL = '/users/create';
export const EDIT_MEMBER_URL = '/users/[id]';

// Clients
export const CLIENTS_URL = '/clients';
export const CREATE_CLIENT_URL = '/clients/create';
export const EDIT_CLIENT_URL = '/clients/[id]';

// Events
export const EVENTS_URL = '/events';
export const EDIT_EVENT_URL = '/events/[id]';


export const MANAGE_INVENTORY_URL = '/inventory';
export const ROUTE_HISTORY = '/history';
export const LOADS_URL = '/events/:eventId/loads';

// Loads

// Settings
export const ROUTE_SETTINGS = '/settings';


export const breadcrumbs = [
  {
    path: ROUTE_DASHBOARD,
    parts: [
      {
        url: ROUTE_DASHBOARD,
        title: 'Dashboard',
      },
    ],
  },
  {
    path: USERS_URL,
    parts: [
      {
        url: USERS_URL,
        title: 'Members',
      },
    ],
  },
  {
    path: CREATE_MEMBER_URL,
    parts: [
      {
        url: USERS_URL,
        title: 'Members',
      },
      {
        url: CREATE_MEMBER_URL,
        title: 'Create',
      },
    ],
  },
  {
    path: EDIT_MEMBER_URL,
    parts: [
      {
        url: USERS_URL,
        title: 'Members',
      },
      {
        url: EDIT_MEMBER_URL,
        title: '[id]',
      },
    ],
  },
  {
    path: CLIENTS_URL,
    parts: [
      {
        url: CLIENTS_URL,
        title: 'Clients',
      },
    ],
  },
  {
    path: CREATE_CLIENT_URL,
    parts: [
      {
        url: CLIENTS_URL,
        title: 'Clients',
      },
      {
        url: CREATE_CLIENT_URL,
        title: 'Create',
      },
    ],
  },
  {
    path: EDIT_CLIENT_URL,
    parts: [
      {
        url: CLIENTS_URL,
        title: 'Clients',
      },
      {
        url: EDIT_CLIENT_URL,
        title: '[id]',
      },
    ],
  },
  {
    path: EVENTS_URL,
    parts: [
      {
        url: EVENTS_URL,
        title: 'Events',
      },
    ],
  },
  {
    path: EDIT_EVENT_URL,
    parts: [
      {
        url: EVENTS_URL,
        title: 'Events',
      },
      {
        url: EDIT_EVENT_URL,
        title: '[id]',
      },
    ],
  },
];

export const AUTH_ROUTES = [
  ROUTE_LOG_IN,
  ROUTE_REGISTER,
];

export const PROTECTED_ROUTES = [
  ROUTE_DASHBOARD,
  ROUTE_HISTORY,
  ROUTE_SETTINGS
]



