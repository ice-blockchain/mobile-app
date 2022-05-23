// SPDX-License-Identifier: BUSL-1.1

import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import news from '../store/modules/News/reducer';
import account from '../store/modules/Accounts/reducer';
import validation from '../store/modules/Validation/reducer';
import auth from '../store/modules/Auth/reducer';
import utilityProcessStatuses from '../store/modules/UtilityProcessStatuses/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: [],
};

const rootReducer = combineReducers({
  auth,
  news,
  account,
  validation,
  utilityProcessStatuses,
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
