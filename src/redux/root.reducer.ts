import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer, AuthStateInterface } from './auth/auth.reducer';
import { layoutReducer, LayoutStateInterface } from './layout/layout.reducer';
import { membersReducer, MembersStateInterface } from './members/members.reducer';
import { clientsReducer, ClientsStateInterface } from './clients/clients.reducer';

export interface RootStateInterface {
  layout: LayoutStateInterface;
  auth: AuthStateInterface,
  members: MembersStateInterface,
  clients: ClientsStateInterface,
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

const membersPersistConfig = {
  key: 'members',
  storage,
  blacklist: ['members'],
};

const clientsPersistConfig = {
  key: 'clients',
  storage,
  blacklist: ['clients'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  layout: layoutReducer,
  members: persistReducer(membersPersistConfig, membersReducer),
  clients: persistReducer(clientsPersistConfig, clientsReducer),
});

export default persistReducer(persistConfig, rootReducer);
