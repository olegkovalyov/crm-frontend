import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer, AuthStateInterface } from './auth/auth.reducer';
import { layoutReducer, LayoutStateInterface } from './layout/layout.reducer';
import { usersReducer, UsersStateInterface } from './users/users.reducer';
import { clientsReducer, ClientsStateInterface } from './clients/clients.reducer';
import { eventsReducer, EventsStateInterface } from './events/events.reducer';

export interface RootStateInterface {
  layout: LayoutStateInterface;
  auth: AuthStateInterface,
  users: UsersStateInterface,
  clients: ClientsStateInterface,
  events: EventsStateInterface,
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

const usersPersistConfig = {
  key: 'users',
  storage,
  blacklist: ['users'],
};

const clientsPersistConfig = {
  key: 'clients',
  storage,
  blacklist: ['clients'],
};

const eventsPersistConfig = {
  key: 'events',
  storage,
  blacklist: ['events'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  layout: layoutReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  clients: persistReducer(clientsPersistConfig, clientsReducer),
  events: persistReducer(eventsPersistConfig, eventsReducer),
});

export default persistReducer(persistConfig, rootReducer);
