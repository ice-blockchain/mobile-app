// SPDX-License-Identifier: BUSL-1.1

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore} from 'redux-persist';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// @ts-expect-error // Window on debug mode exists
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const arrayMiddleware = [];
arrayMiddleware.push(sagaMiddleware);

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  arrayMiddleware.push(createDebugger());
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...arrayMiddleware)),
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default {
  store,
  persistor,
};
