// SPDX-License-Identifier: ice License 1.0

import {accountReducer} from '@store/modules/Account/reducer';
import {achievementsReducer} from '@store/modules/Achievements/reducer';
import {activeTab} from '@store/modules/ActiveTab/reducer';
import {analyticsReducer} from '@store/modules/Analytics/reducer';
import {appCommonReducer} from '@store/modules/AppCommon/reducer';
import {collectionsReducer} from '@store/modules/Collections/reducer';
import {teamReducer} from '@store/modules/Contacts/reducer';
import {devicesReducer} from '@store/modules/Devices/reducer';
import {linkingReducer} from '@store/modules/Linking/reducer';
import {newsReducer} from '@store/modules/News/reducer';
import {notificationsReducer} from '@store/modules/Notifications/reducer';
import {permissionsReducer} from '@store/modules/Permissions/reducer';
import {rateAppReducer} from '@store/modules/RateApp/reducer';
import {referralsReducer} from '@store/modules/Referrals/reducer';
import {statsReducer} from '@store/modules/Stats/reducer';
import {statusNotice} from '@store/modules/StatusNotice/reducer';
import {tokenomicsReducer} from '@store/modules/Tokenomics/reducer';
import {usersReducer} from '@store/modules/Users/reducer';
import {processStatusesReducer} from '@store/modules/UtilityProcessStatuses/reducer';
import {validationReducer} from '@store/modules/Validation/reducer';
import {walkthroughReducer} from '@store/modules/Walkthrough/reducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  activeTab: activeTab,
  analytics: analyticsReducer,
  appCommon: appCommonReducer,
  permissions: permissionsReducer,
  account: accountReducer,
  stats: statsReducer,
  news: newsReducer,
  team: teamReducer,
  validation: validationReducer,
  collections: collectionsReducer,
  referrals: referralsReducer,
  utilityProcessStatuses: processStatusesReducer,
  devices: devicesReducer,
  linking: linkingReducer,
  notifications: notificationsReducer,
  users: usersReducer,
  statusNotice,
  tokenomics: tokenomicsReducer,
  rateApp: rateAppReducer,
  walkthrough: walkthroughReducer,
  achievements: achievementsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
