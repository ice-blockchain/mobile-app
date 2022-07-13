// SPDX-License-Identifier: BUSL-1.1

import {createUserDeviceSettings} from './createUserDeviceSettings';
import {getUserDeviceSettings} from './getUserDeviceSettings';
import {updateDeviceLocation} from './updateDeviceLocation';
import {updateDeviceMetadata} from './updateDeviceMetadata';
import {updateDeviceSettings} from './updateDeviceSettings';

export const devices = Object.freeze({
  createUserDeviceSettings,
  getUserDeviceSettings,
  updateDeviceMetadata,
  updateDeviceLocation,
  updateDeviceSettings,
});
