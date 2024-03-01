// SPDX-License-Identifier: ice License 1.0

import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import {rootReducer} from './rootReducer';
import {rootSaga} from './rootSaga';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      serializableCheck: {
        ignoredActionPaths: [
          'payload.raceConditionStrategy',
          'payload.elementData',
          'payload.finishTask',
        ],
        ignoredPaths: [
          'utilityProcessStatuses.UPDATE_ACCOUNT.payload.raceConditionStrategy',
          'utilityProcessStatuses.SET_WALKTHROUGH_STEP_ELEMENT_DATA.payload.elementData',
          'walkthrough.stepElements',
          'utilityProcessStatuses.SYNC_CONTACTS_BACKGROUND_TASK.payload.finishTask',
          'utilityProcessStatuses.DATA_MESSAGE_ARRIVE.payload.finishTask',
        ],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
  enhancers: [],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
