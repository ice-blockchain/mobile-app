// SPDX-License-Identifier: ice License 1.0

import {DeviceLocation} from '@api/devices/types';
import {createAction} from '@store/utils/actions/createAction';

const UPDATE_DEVICE_METADATA = createAction('UPDATE_DEVICE_METADATA', {
  START: (payload: {forceUpdate?: boolean; clearDeviceMetadata?: boolean}) =>
    payload,
  SUCCESS: () => {},
  FAILED: (errorMessage: string, errorCode?: string) => ({
    errorMessage,
    errorCode,
  }),
});

const INIT_DEVICE = createAction('INIT_DEVICE', {
  SUCCESS: (deviceUniqueId: string) => ({
    deviceUniqueId,
  }),
  FAILED: (errorMessage: string) => ({errorMessage}),
});

const UPDATE_DEVICE_LOCATION = createAction('UPDATE_DEVICE_LOCATION', {
  START: (deviceUniqueId?: string) => ({deviceUniqueId}),
  SUCCESS: (payload: DeviceLocation) => payload,
  FAILED: (errorMessage: string) => ({errorMessage}),
});

export const DeviceActions = Object.freeze({
  INIT_DEVICE,
  UPDATE_DEVICE_LOCATION,
  UPDATE_DEVICE_METADATA,
});
