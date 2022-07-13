// SPDX-License-Identifier: BUSL-1.1

import {isApiError} from '@api/client/utils';
import {DeviceSettings} from '@api/devices/types';
import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceUniqueIdSelector} from '@store/modules/Devices/selectors';
import i18n from '@translations/i18n';
import {call, put, SagaReturnType, select} from 'redux-saga/effects';

export function* getOrCreateDeviceSettingsSaga() {
  try {
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    const deviceUniqueId: ReturnType<typeof deviceUniqueIdSelector> =
      yield select(deviceUniqueIdSelector);
    const settings: SagaReturnType<typeof getOrCreateDeviceSettings> =
      yield call(getOrCreateDeviceSettings, {userId, deviceUniqueId});
    yield put(DeviceActions.GET_OR_CREATE_SETTINGS.SUCCESS.create(settings));
  } catch (error) {
    //TODO:: get error message
    yield put(
      DeviceActions.GET_OR_CREATE_SETTINGS.FAILED.create('error message here'),
    );
  }
}

export function* getOrCreateDeviceSettings({
  userId,
  deviceUniqueId,
}: {
  userId: string;
  deviceUniqueId: string;
}) {
  let settings: DeviceSettings;
  try {
    settings = yield call(Api.devices.getUserDeviceSettings, {
      userId,
      deviceUniqueId,
    });
    if (settings.language !== i18n.currentLocale()) {
      i18n.locale = settings.language;
    }
  } catch (error) {
    if (isApiError(error, 404, 'DEVICE_SETTINGS_NOT_FOUND')) {
      settings = yield call(
        Api.devices.createUserDeviceSettings,
        {userId, deviceUniqueId},
        {language: i18n.locale},
      );
    } else {
      throw error;
    }
  }
  return settings;
}
