// SPDX-License-Identifier: BUSL-1.1

import {DeviceLocation, DeviceSettings} from '@api/devices/types';
import {createAction} from '@store/utils/actions/createAction';
import {DeepPartial} from 'redux';

const GET_OR_CREATE_SETTINGS = createAction('GET_OR_CREATE_SETTINGS', {
  START: () => {},
  SUCCESS: (settings: DeviceSettings) => settings,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const UPDATE_SETTINGS = createAction('SET_SETTINGS', {
  START: (settings: DeepPartial<DeviceSettings>) => settings,
  SUCCESS: (settings: DeviceSettings) => settings,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const INIT_DEVICE = createAction('INIT_DEVICE', {
  STATE: (deviceUniqueId: string, settings: DeviceSettings | null) => ({
    deviceUniqueId,
    settings,
  }),
});

const UPDATE_DEVICE_LOCATION = createAction('UPDATE_DEVICE_LOCATION', {
  START: (deviceUniqueId?: string) => ({deviceUniqueId}),
  SUCCESS: (payload: DeviceLocation) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const DeviceActions = Object.freeze({
  GET_OR_CREATE_SETTINGS,
  UPDATE_SETTINGS,
  INIT_DEVICE,
  UPDATE_DEVICE_LOCATION,
});
