// SPDX-License-Identifier: ice License 1.0

import {isLightDesign} from '@constants/featureFlags';
import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {showCreativeLibrarySaga} from '@store/modules/CreativeLibrary/sagas/showCreativeLibrary';
import {takeLatest} from 'redux-saga/effects';

export const creativeLibraryWatchers = isLightDesign
  ? []
  : [
      takeLatest(
        [
          AccountActions.USER_STATE_CHANGE.SUCCESS.type,
          AppCommonActions.APP_STATE_CHANGE.STATE.type,
        ],
        showCreativeLibrarySaga,
      ),
    ];
