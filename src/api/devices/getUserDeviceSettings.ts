// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {DeviceSettings} from '@api/devices/types';

/**
 * Returns the settings of an user's device
 */

export function getUserDeviceSettings(userId = '-', deviceUniqueId = '-') {
  return get<DeviceSettings>(
    `/users/${userId}/devices/${deviceUniqueId}/settings`,
  );
}
