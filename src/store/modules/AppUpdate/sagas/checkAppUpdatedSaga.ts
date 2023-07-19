// SPDX-License-Identifier: ice License 1.0

import {LINKS} from '@constants/links';
import {AppUpdateActions} from '@store/modules/AppUpdate/actions';
import {appVersionSelector} from '@store/modules/AppUpdate/selectors';
import {openUpdateSuccessful} from '@store/modules/AppUpdate/utils/openUpdateSuccessful';
import {checkProp} from '@utils/guards';
import DeviceInfo from 'react-native-device-info';
import RNLocalize from 'react-native-localize';
import checkVersion from 'react-native-store-version';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* checkAppUpdatedSaga() {
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

  if (!prevVersion) {
    yield put(
      AppUpdateActions.SET_APP_VERSION.STATE.create({version: currentVersion}),
    );
    return;
  }

  if (isUpdated) {
    try {
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
        yield call(openUpdateSuccessful);
      }
    } catch (error) {
      /**
       * Ignoring network errors - for example it is thrown when GP is blocked
       */
      if (
        !checkProp(error, 'message') ||
        error.message !== 'Network request failed'
      ) {
        throw error;
      }
    }

    yield put(
      AppUpdateActions.SET_APP_VERSION.STATE.create({version: currentVersion}),
    );
  }
}
