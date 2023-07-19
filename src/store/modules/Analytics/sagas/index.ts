// SPDX-License-Identifier: ice License 1.0

import {AccountActions} from '@store/modules/Account/actions';
import {AnalyticsActions} from '@store/modules/Analytics/actions';
import {startTrackingCurrentUserSaga} from '@store/modules/Analytics/sagas/startTrackingCurrentUser';
import {trackSignInSaga} from '@store/modules/Analytics/sagas/trackSignInSaga';
import {trackSignUpSaga} from '@store/modules/Analytics/sagas/trackSignUpSaga';
import {updateAttributesSaga} from '@store/modules/Analytics/sagas/updateAttributes';
import {updateReferredBySaga} from '@store/modules/Analytics/sagas/updateReferredBy';
import {updateResurrectResponseTypeSaga} from '@store/modules/Analytics/sagas/updateResurrectResponseType';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {takeLatest} from 'redux-saga/effects';

export const analyticsWatchers = [
  takeLatest(
    [
      AccountActions.GET_ACCOUNT.SUCCESS.type,
      AccountActions.USER_STATE_CHANGE.SUCCESS.type,
      AccountActions.UPDATE_ACCOUNT.SUCCESS.type,
      TokenomicsActions.GET_RANKING_SUMMARY.SUCCESS.type,
      TokenomicsActions.START_MINING_SESSION.SUCCESS.type,
      TokenomicsActions.GET_MINING_SUMMARY.SUCCESS.type,
      PermissionsActions.GET_PERMISSIONS.START.type,
      AppCommonActions.APP_STATE_CHANGE.STATE.type,
      AppCommonActions.APP_LOADED.STATE.type,
      TokenomicsActions.START_OR_UPDATE_PRE_STAKING.SUCCESS.type,
      TokenomicsActions.GET_PRE_STAKING_SUMMARY.SUCCESS.type,
    ],
    updateAttributesSaga,
  ),
  takeLatest(
    [
      AnalyticsActions.TRACK_SIGN_UP.SUCCESS.type,
      AnalyticsActions.UPDATE_RESURRECT_RESPONSE_TYPE.START.type,
    ],
    updateResurrectResponseTypeSaga,
  ),
  takeLatest(
    [
      AccountActions.UPDATE_REF_BY_USERNAME.SUCCESS.type,
      AnalyticsActions.UPDATE_REFERRED_BY.START.type,
    ],
    updateReferredBySaga,
  ),
  takeLatest(AnalyticsActions.TRACK_SIGN_IN.START.type, trackSignInSaga),
  takeLatest(AnalyticsActions.TRACK_SIGN_UP.START.type, trackSignUpSaga),
  takeLatest(
    AccountActions.USER_STATE_CHANGE.SUCCESS.type,
    startTrackingCurrentUserSaga,
  ),
];
