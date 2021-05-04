export const SIGN_IN_URL = '/signin';
export const SIGN_UP_URL = '/signup';
export const FORGOT_PASSWORD_URL = '/forgot-password';
export const RESET_PASSWORD_URL = '/reset-password';

export const HOME_URL = '/';

// Dashboard
export const DASHBOARD_URL = '/dashboard';

// Members
export const MEMBERS_URL = '/members';
export const CREATE_MEMBER_URL = '/members/create';
export const EDIT_MEMBER_URL = '/members/[id]';

// Clients
export const CLIENTS_URL = '/clients';
export const CREATE_CLIENT_URL = '/clients/create';
export const EDIT_CLIENT_URL = '/clients/[id]';

// Events
export const EVENTS_URL = '/events';
export const EDIT_EVENT_URL = '/events/[id]';


export const MANAGE_INVENTORY_URL = '/inventory';
export const HISTORY_URL = '/history';
export const LOADS_URL = '/events/:eventId/loads';

// Loads

// Settings
export const SETTINGS_URL = '/settings';


export const breadcrumbs = [
  {
    path: DASHBOARD_URL,
    parts: [
      {
        url: DASHBOARD_URL,
        title: 'Dashboard',
      },
    ],
  },
  {
    path: MEMBERS_URL,
    parts: [
      {
        url: MEMBERS_URL,
        title: 'Members',
      },
    ],
  },
  {
    path: CREATE_MEMBER_URL,
    parts: [
      {
        url: MEMBERS_URL,
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
        url: MEMBERS_URL,
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


