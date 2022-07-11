// SPDX-License-Identifier: BUSL-1.1

import {DeviceSettings} from '@api/devices/types';
import {createAction} from '@store/utils/actions/createAction';
import {DeepPartial} from 'redux';

const GET_SETTINGS = createAction('GET_SETTINGS', {
  START: () => {},
  SUCCESS: (settings: DeviceSettings) => settings,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const UPDATE_SETTINGS = createAction('SET_SETTINGS', {
  START: (settings: DeepPartial<DeviceSettings>) => settings,
  SUCCESS: (settings: DeviceSettings) => settings,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const SET_DEVICE_UNIQUE_ID = createAction('SET_DEVICE_UNIQUE_ID', {
  STATE: (deviceUniqueId: string) => ({deviceUniqueId}),
});

export const DeviceActions = Object.freeze({
  GET_SETTINGS,
  UPDATE_SETTINGS,
  SET_DEVICE_UNIQUE_ID,
});
