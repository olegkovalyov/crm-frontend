import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { UiStateInterface, uiReducer } from './ui/ui.reducer';
import { authReducer, AuthStateInterface } from './auth/auth.reducer';

export interface RootStateInterface {
  ui: UiStateInterface;
  auth: AuthStateInterface,
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['currentUser', 'refreshTokenExists'],
};

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export default persistReducer(persistConfig, rootReducer);
