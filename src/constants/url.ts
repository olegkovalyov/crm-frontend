export const url = {
  // Anonymous
  login: '/login',
  register: '/register',
  // Authenticated
  dashboard: '/',
  users: '/users',
  editUser: '/users',
  createUser: '/users/create',
  settings: '/settings',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password/:token',
};

export const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'Dashboard',
  '/settings': 'Settings',
  '/users': 'Users',
  '/users/create': 'Create',
};
