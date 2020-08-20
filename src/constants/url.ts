export const url = {
  // Anonymous
  login: '/login',
  register: '/register',
  // Authenticated
  dashboard: '/',
  users: '/users/manage',
  editUser: '/users/manage/:id',
  addUser: '/users/manage/add',
  settings: '/settings',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password/:token',
};

export const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'Dashboard',
  '/settings': 'Settings',
  '/users': 'Users',
  '/users/manage': 'Manage',
  '/users/add': 'Add user',
};
