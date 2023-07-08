// SPDX-License-Identifier: ice License 1.0

import {getInstallReferrer} from '@services/installInfo';
import {logError} from '@services/logging';
import {AccountActions} from '@store/modules/Account/actions';
import {AppCommonActions} from '@store/modules/AppCommon/actions';
import {Alert} from 'react-native';
import {call, delay, put, SagaReturnType, take} from 'redux-saga/effects';

/**
 * The install referrer information will be available for 90 days and won't change unless the application is reinstalled.
 * To avoid unnecessary API calls in your app, you should invoke the API only once during the first execution after install.
 * https://developer.android.com/google/play/installreferrer/library#install-referrer
 */
export function* getInstallReferrerSaga() {
  try {
    const referrerParams: SagaReturnType<typeof getInstallReferrer> =
      yield call(getInstallReferrer);

    yield take(AppCommonActions.UPDATE_SPLASH_VISIBLE_STATE.HIDE.type);
    yield delay(1000);

    Alert.alert('install ref', referrerParams ?? '');
    if (referrerParams) {
      const referrer = new URLSearchParams(
        decodeURIComponent(referrerParams),
      ).get('ice_referrer');

      if (referrer) {
        yield put(
          AccountActions.SET_INSTALL_REFERRER.STATE.create({
            installReferrer: referrer,
          }),
        );
        return;
      }
    }

    yield put(
      AccountActions.SET_INSTALL_REFERRER.STATE.create({installReferrer: ''}),
    );
  } catch (error) {
    // @ts-ignore
    Alert.alert('install ref', error.message ?? '');
    logError(error);
  }
}
