// SPDX-License-Identifier: BUSL-1.1

import {DeviceSettings} from '@api/devices/types';
import {Api} from '@api/index';
import {userIdSelector} from '@store/modules/Auth/selectors';
import {DeviceActions} from '@store/modules/Devices/actions';
import {deviceUniqueIdSelector} from '@store/modules/Devices/selectors';
import {merge} from 'lodash';
import {DeepPartial} from 'redux';
import {buffers, FlushableChannel, TakeableChannel} from 'redux-saga';
import {
  actionChannel,
  call,
  flush,
  put,
  SagaReturnType,
  select,
  take,
} from 'redux-saga/effects';

type Action = ReturnType<typeof DeviceActions.UPDATE_SETTINGS.START.create>;

export function* watchUpdateDeviceSettings() {
  const updateChannel: TakeableChannel<Action> & FlushableChannel<Action> =
    yield actionChannel(
      DeviceActions.UPDATE_SETTINGS.START.type,
      buffers.expanding(10),
    );
  while (true) {
    const nextAction: Action = yield take(updateChannel);
    const bufferedActions: Action[] = yield flush<Action>(updateChannel);
    const mergedChange: DeepPartial<DeviceSettings> = [
      nextAction,
      ...bufferedActions,
    ].reduce((snapshot, action) => merge(snapshot, action.payload), {});

    yield call(updateDeviceSettingsSaga, mergedChange);
  }
}

export function* updateDeviceSettingsSaga(
  settings: DeepPartial<DeviceSettings>,
) {
  try {
    const userId: ReturnType<typeof userIdSelector> = yield select(
      userIdSelector,
    );
    const deviceUniqueId: ReturnType<typeof deviceUniqueIdSelector> =
      yield select(deviceUniqueIdSelector);
    const updatedSetings: SagaReturnType<
      typeof Api.devices.updateDeviceSettings
    > = yield call(Api.devices.updateDeviceSettings, {
      deviceId: {userId, deviceUniqueId},
      settings,
    });
    yield put(DeviceActions.UPDATE_SETTINGS.SUCCESS.create(updatedSetings));
  } catch (error) {
    //TODO:: get error message
    yield put(
      DeviceActions.UPDATE_SETTINGS.FAILED.create('error message here'),
    );
  }
}
