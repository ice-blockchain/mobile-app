// SPDX-License-Identifier: ice License 1.0

import {getInstallReferrer} from '@services/installInfo';
import {AccountActions} from '@store/modules/Account/actions';
import {installReferrerSelector} from '@store/modules/Account/selectors';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

/**
 * The install referrer information will be available for 90 days and won't change unless the application is reinstalled.
 * To avoid unnecessary API calls in your app, you should invoke the API only once during the first execution after install.
 * https://developer.android.com/google/play/installreferrer/library#install-referrer
 */
export function* getInstallReferrerSaga() {
  try {
    const installReferrer: SagaReturnType<typeof installReferrerSelector> =
      yield select(installReferrerSelector);

    if (installReferrer !== null) {
      return;
    }

    const referrerParams: SagaReturnType<typeof getInstallReferrer> =
      yield call(getInstallReferrer);

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
    yield put(
      AccountActions.SET_INSTALL_REFERRER.STATE.create({installReferrer: ''}),
    );
  }
}
