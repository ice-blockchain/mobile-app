// SPDX-License-Identifier: ice License 1.0

import {getInstallUrl} from '@services/installInfo';
import {AccountActions} from '@store/modules/Account/actions';
import {call, put, SagaReturnType} from 'redux-saga/effects';

/**
 * The install referrer information will be available for 90 days and won't change unless the application is reinstalled.
 * To avoid unnecessary API calls in your app, you should invoke the API only once during the first execution after install.
 * https://developer.android.com/google/play/installreferrer/library#install-referrer
 */
export function* getInstallReferrerSaga() {
  try {
    // TODO:: persist referrer and don't call the api if not null

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
      return;
    }

    AccountActions.SET_INSTALL_REFERRER.STATE.create({installReferrer: ''});
  } catch (error) {
    AccountActions.SET_INSTALL_REFERRER.STATE.create({installReferrer: ''});
  }
}
