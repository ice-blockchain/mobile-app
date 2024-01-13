// SPDX-License-Identifier: ice License 1.0

import {isLightDesign} from '@constants/featureFlags';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {checkAppUpdatedSaga} from '@store/modules/AppUpdate/sagas/checkAppUpdatedSaga';
import {updateRequiredSaga} from '@store/modules/AppUpdate/sagas/updateRequiredSaga';
import {DeviceActions} from '@store/modules/Devices/actions';
import {takeLatest} from 'redux-saga/effects';

export const appUpdateWatchers = isLightDesign
  ? []
  : [
      takeLatest(
        DeviceActions.UPDATE_DEVICE_METADATA.FAILED.type,
        updateRequiredSaga,
      ),
      takeLatest(
        AppCommonActions.UPDATE_SPLASH_VISIBLE_STATE.HIDE.type,
        checkAppUpdatedSaga,
      ),
    ];
