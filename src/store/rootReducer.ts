// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {accountReducer} from '@store/modules/Accounts/reducer';
import {authReducer} from '@store/modules/Auth/reducer';
import {newsReducer} from '@store/modules/News/reducer';
import {referralsReducer} from '@store/modules/Referrals/reducer';
import {statisticsReducer} from '@store/modules/Statistics/reducer';
import {processStatusesReducer} from '@store/modules/UtilityProcessStatuses/reducer';
import {validationReducer} from '@store/modules/Validation/reducer';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

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
