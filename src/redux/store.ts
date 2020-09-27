import { createStore, applyMiddleware, Middleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import rootReducer from './root.reducer';


const middleware: Middleware[] = [];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export const persistor = persistStore(store);


