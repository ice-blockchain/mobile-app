// SPDX-License-Identifier: BUSL-1.1

import {get} from '@api/client';
import {DeviceId, DeviceSettings} from '@api/devices/types';

/**
 * Returns the settings of an user's device
 */

export function getUserDeviceSettings({userId, deviceUniqueId}: DeviceId) {
  return get<DeviceSettings>(
    `/users/${userId}/devices/${deviceUniqueId}/settings`,
  );
}
