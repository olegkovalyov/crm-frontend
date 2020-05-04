import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import rootReducer from './root.reducer';
import rootSaga from './root.saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

