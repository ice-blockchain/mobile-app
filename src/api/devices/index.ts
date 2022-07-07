// SPDX-License-Identifier: BUSL-1.1

import {getUserDeviceSettings} from './getUserDeviceSettings';
import {updateDeviceLocation} from './updateDeviceLocation';
import {updateDeviceMetadata} from './updateDeviceMetadata';

export const devices = Object.freeze({
  getUserDeviceSettings,
  updateDeviceMetadata,
  updateDeviceLocation,
});
