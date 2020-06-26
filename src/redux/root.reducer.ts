import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { IUiState, uiReducer } from './ui/ui.reducer';
import { authReducer, IAuthState } from './auth/auth.reducer';
import { IUsersState, usersReducer } from './users/users.reducer';

export interface IRootState {
  ui: IUiState;
  auth: IAuthState,
  users: IUsersState,
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'ui', 'users'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['currentUser', 'token'],
};

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  users: usersReducer,
});

export default persistReducer(persistConfig, rootReducer);
