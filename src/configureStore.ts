// SPDX-License-Identifier: BUSL-1.1

import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore} from 'redux-persist';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const arrayMiddleware = [];
arrayMiddleware.push(sagaMiddleware);

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  arrayMiddleware.push(createDebugger());
}

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default {
  store,
  persistor,
};
