import { lazy } from 'react';
import { IRoute } from './interfaces/routes.interface';
import {
  CREATE_USER_URL,
  DASHBOARD_URL,
  EDIT_USER_URL,
  FORGOT_PASSWORD_URL,
  HISTORY_URL,
  JUMPS_URL,
  LOGIN_URL,
  MANAGE_USERS_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
  SETTINGS_URL,
} from './constants/route.constants';

export const authUrls = [
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
];

export const routes: IRoute[] = [
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
    path: DASHBOARD_URL,
    component: lazy(() => import('./pages/dashboard/dashboard.component')),
    exact: true,
    private: true,
  },
  {
    path: MANAGE_USERS_URL,
    component: lazy(() => import('./pages/users/users.component')),
    exact: true,
    private: true,
  },
  {
    path: CREATE_USER_URL,
    component: lazy(() => import('./pages/create-user/create-user.component')),
    exact: true,
    private: true,
  },
  {
    path: EDIT_USER_URL,
    component: lazy(() => import('./pages/edit-user/edit-user.component')),
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
    path: JUMPS_URL,
    component: lazy(() => import('./pages/jumps/jumps.component')),
    exact: true,
    private: true,
  },
  {
    path: HISTORY_URL,
    component: lazy(() => import('./pages/history/history.component')),
    exact: true,
    private: true,
  },
];
