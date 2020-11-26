import { lazy } from 'react';
import { RouteInterface } from './interfaces/routes.interface';
import {
  CREATE_MEMBER_URL,
  DASHBOARD_URL,
  EDIT_MEMBER_URL,
  FORGOT_PASSWORD_URL,
  HISTORY_URL,
  EVENTS_URL,
  LOGIN_URL,
  MEMBERS_URL,
  NO_MATCH_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
  SETTINGS_URL,
  MANAGE_INVENTORY_URL,
  HOME_URL,
  CREATE_EVENT_URL,
  EDIT_EVENT_URL,
  LOADS_URL,
  CLIENTS_URL,
  CREATE_CLIENT_URL, EDIT_CLIENT_URL,
} from './constants/route.constants';

export const authUrls = [
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  RESET_PASSWORD_URL,
];

export const routes: RouteInterface[] = [
  // Public
  {
    path: LOGIN_URL,
    component: lazy(() => import('./pages/login/login.component')),
    exact: true,
    private: false,
  },
  {
    path: REGISTER_URL,
    component: lazy(() => import('./pages/register/register.component')),
    exact: true,
    private: false,
  },
  {
    path: FORGOT_PASSWORD_URL,
    component: lazy(() => import('./pages/forgot-password/forgot-password.component')),
    exact: true,
    private: false,
  },
  {
    path: RESET_PASSWORD_URL,
    component: lazy(() => import('./pages/reset-password/reset-password.component')),
    exact: true,
    private: false,
  },

  // Private
  {
    path: HOME_URL,
    component: lazy(() => import('./pages/dashboard/dashboard.component')),
    exact: true,
    private: true,
  },
  {
    path: DASHBOARD_URL,
    component: lazy(() => import('./pages/dashboard/dashboard.component')),
    exact: true,
    private: true,
  },
  {
    path: MEMBERS_URL,
    component: lazy(() => import('./pages/users/users.component')),
    exact: true,
    private: true,
  },
  {
    path: CREATE_MEMBER_URL,
    component: lazy(() => import('./pages/create-user/create-user.component')),
    exact: true,
    private: true,
  },
  {
    path: EDIT_MEMBER_URL,
    component: lazy(() => import('./pages/edit-member/edit-member.component')),
    exact: false,
    private: true,
  },
  {
    path: MANAGE_INVENTORY_URL,
    component: lazy(() => import('./pages/inventory/inventory.component')),
    exact: false,
    private: true,
  },
  {
    path: SETTINGS_URL,
    component: lazy(() => import('./pages/settings/settings.component')),
    exact: true,
    private: true,
  },
  {
    path: EVENTS_URL,
    component: lazy(() => import('./pages/events/events.component')),
    exact: true,
    private: true,
  },
  {
    path: CREATE_EVENT_URL,
    component: lazy(() => import('./pages/create-event/create-event.component')),
    exact: true,
    private: true,
  },
  {
    path: EDIT_EVENT_URL,
    component: lazy(() => import('./pages/edit-event/edit-event.component')),
    exact: true,
    private: true,
  },
  {
    path: CLIENTS_URL,
    component: lazy(() => import('./pages/clients/clients.component')),
    exact: true,
    private: true,
  },
  {
    path: CREATE_CLIENT_URL,
    component: lazy(() => import('./pages/create-client/create-client.component')),
    exact: true,
    private: true,
  },
  {
    path: EDIT_CLIENT_URL,
    component: lazy(() => import('./pages/edit-client/edit-client.component')),
    exact: true,
    private: true,
  },
  {
    path: LOADS_URL,
    component: lazy(() => import('./pages/loads/loads.component')),
    exact: true,
    private: true,
  },
  {
    path: HISTORY_URL,
    component: lazy(() => import('./pages/history/history.component')),
    exact: true,
    private: true,
  },
  {
    path: NO_MATCH_URL,
    component: lazy(() => import('./pages/not-found/not-found.component')),
    exact: true,
    private: false,
  },
];

