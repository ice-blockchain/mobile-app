// SPDX-License-Identifier: BUSL-1.1

import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import news from '@modules/News/reducer';
import utilityProcessStatuses from '@modules/UtilityProcessStatuses/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: [],
};

const rootReducer = combineReducers({
  news,
  utilityProcessStatuses,
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
