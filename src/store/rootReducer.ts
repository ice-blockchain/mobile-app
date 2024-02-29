// SPDX-License-Identifier: ice License 1.0

import {appCommonReducer} from '@store/modules/AppCommon/reducer';
import {linkingReducer} from '@store/modules/Linking/reducer';
import {permissionsReducer} from '@store/modules/Permissions/reducer';
import {statsReducer} from '@store/modules/Stats/reducer';
import {processStatusesReducer} from '@store/modules/UtilityProcessStatuses/reducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  appCommon: appCommonReducer,
  permissions: permissionsReducer,
  stats: statsReducer,
  utilityProcessStatuses: processStatusesReducer,
  linking: linkingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
