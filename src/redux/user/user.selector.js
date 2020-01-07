export const currentUserSelector = (state) => {
  return state.user.currentUser;
};

export const tokenSelector = (state) => {
  return state.user.token;
};

export const tokenExpiresAtSelector = (state) => {
  return state.user.tokenExpiresAt;
};

export const isLoginInProgressSelector = (state) => {
  return state.user.isLoginInProgress;
};

export const loginErrorMessageSelector = (state) => {
  return state.user.loginErrorMessage;
};
