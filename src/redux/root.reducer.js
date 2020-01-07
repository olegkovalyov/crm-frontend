import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import planReducer from './plan/plan.reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [
    'user',
  ],
};

const rootReducer = combineReducers({
  user: userReducer,
  plan: planReducer,
});

export default persistReducer(persistConfig, rootReducer);
