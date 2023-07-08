// SPDX-License-Identifier: ice License 1.0

import {getInstallUrl} from '@services/installInfo';
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

    const installUrl: SagaReturnType<typeof getInstallUrl> = yield call(
      getInstallUrl,
    );

    if (installUrl) {
      const referrer = new URL(installUrl).searchParams.get('referrer') ?? '';
      yield put(
        AccountActions.SET_INSTALL_REFERRER.STATE.create({
          installReferrer: decodeURIComponent(referrer),
        }),
      );
    } else {
      yield put(
        AccountActions.SET_INSTALL_REFERRER.STATE.create({installReferrer: ''}),
      );
    }
  } catch (error) {
    yield put(
      AccountActions.SET_INSTALL_REFERRER.STATE.create({installReferrer: ''}),
    );
  }
}
