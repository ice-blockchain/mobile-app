// SPDX-License-Identifier: BUSL-1.1

import AsyncStorage from '@react-native-async-storage/async-storage';
import {appCommonReducer} from '@store/modules/AppCommon/reducer';
import {authReducer} from '@store/modules/Auth/reducer';
import {devicesReducer} from '@store/modules/Devices/reducer';
import {newsReducer} from '@store/modules/News/reducer';
import {permissionsReducer} from '@store/modules/Permissions/reducer';
import {referralsReducer} from '@store/modules/Referrals/reducer';
import {statisticsReducer} from '@store/modules/Statistics/reducer';
import {teamReducer} from '@store/modules/Team/reducer';
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
  appCommon: appCommonReducer,
  permissions: permissionsReducer,
  auth: authReducer,
  news: newsReducer,
  team: teamReducer,
  validation: validationReducer,
  statistics: statisticsReducer,
  referrals: referralsReducer,
  utilityProcessStatuses: processStatusesReducer,
  devices: devicesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const persistedRootReducer = persistReducer(persistConfig, rootReducer);
