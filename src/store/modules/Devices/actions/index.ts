// SPDX-License-Identifier: BUSL-1.1

import {DeviceSettings} from '@api/devices/types';
import {createAction} from '@store/utils/actions/createAction';

const GET_SETTINGS = createAction('GET_SETTINGS', {
  START: () => {},
  SUCCESS: (payload: DeviceSettings) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const SET_DEVICE_UNIQUE_ID = createAction('SET_DEVICE_UNIQUE_ID', {
  STATE: (deviceUniqueId: string) => ({deviceUniqueId}),
});

export const DeviceActions = Object.freeze({
  GET_SETTINGS,
  SET_DEVICE_UNIQUE_ID,
});
