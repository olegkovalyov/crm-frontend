// Auth | Login

export const currentUserSelector = (state) => {
  return state.user.currentUser;
};

export const tokenSelector = (state) => {
  return state.user.token;
};

export const tokenExpiresAtSelector = (state) => {
  return state.user.tokenExpiresAt;
};

export const isLoginInProcessSelector = (state) => {
  return state.user.isLoginInProcess;
};

export const loginErrorMessageSelector = (state) => {
  return state.user.loginErrorMessage;
};

// Register

export const isRegisterInProcessSelector = (state) => {
  return state.user.isRegisterInProcess;
};

export const registerErrorMessageSelector = (state) => {
  return state.user.registerErrorMessage;
};

// Forgot password

export const forgotPasswordStatusSelector = (state) => {
  return state.user.forgotPasswordStatus;
};

export const forgotPasswordErrorMessageSelector = (state) => {
  return state.user.forgotPasswordErrorMessage;
};

// Change password

export const changePasswordStatusSelector = (state) => {
  return state.user.changePasswordStatus;
};

export const changePasswordErrorMessageSelector = (state) => {
  return state.user.changePasswordErrorMessage;
};
