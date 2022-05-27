// SPDX-License-Identifier: BUSL-1.1

import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {newsReducer} from '../store/modules/News/reducer';
import {accountReducer} from '../store/modules/Accounts/reducer';
import {validationReducer} from '../store/modules/Validation/reducer';
import {statisticsReducer} from '../store/modules/Statistics/reducer';
import {referralsReducer} from '../store/modules/Referrals/reducer';
import {authReducer} from '../store/modules/Auth/reducer';
import {processStatusesReducer} from '../store/modules/UtilityProcessStatuses/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 120000,
  whitelist: [],
};

const rootReducer = combineReducers({
  auth: authReducer,
  news: newsReducer,
  account: accountReducer,
  validation: validationReducer,
  statistics: statisticsReducer,
  referrals: referralsReducer,
  utilityProcessStatuses: processStatusesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const persistedRootReducer = persistReducer(persistConfig, rootReducer);
