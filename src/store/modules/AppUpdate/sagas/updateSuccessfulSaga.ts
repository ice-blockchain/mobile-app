// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {AppUpdateActions} from '@store/modules/AppUpdate/actions';
import {appVersionSelector} from '@store/modules/AppUpdate/selectors';
import DeviceInfo from 'react-native-device-info';
import RNLocalize from 'react-native-localize';
import checkVersion from 'react-native-store-version';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* updateSuccessfulSaga() {
  const prevVersion: ReturnType<typeof appVersionSelector> = yield select(
    appVersionSelector,
  );
  const currentVersion: ReturnType<typeof DeviceInfo.getVersion> = yield call(
    DeviceInfo.getVersion,
  );

  const isUpdated = prevVersion
    ? currentVersion.localeCompare(prevVersion, undefined, {
        numeric: true,
        sensitivity: 'base',
      }) === 1
    : false;

  if (!prevVersion || isUpdated) {
    yield put(
      AppUpdateActions.SET_APP_VERSION.STATE.create({version: currentVersion}),
    );
    return;
  }

  const storeStatus: SagaReturnType<typeof checkVersion> = yield call(
    checkVersion,
    {
      version: currentVersion,
      iosStoreURL: LINKS.APP_STORE,
      androidStoreURL: LINKS.PLAY_STORE,
      country: RNLocalize.getCountry(),
    },
  );

  if (storeStatus.result === 'equal') {
    //TODO::show success update
  }
}
