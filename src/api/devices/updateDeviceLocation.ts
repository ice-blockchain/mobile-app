// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';
import {DeviceId, DeviceLocation} from '@api/devices/types';

/**
 * Returns the device's geolocation based on its IP
 * or based on account information if userId is also provided.
 */

export function updateDeviceLocation({
  userId = '-',
  deviceUniqueId = '-',
}: DeviceId) {
  return put<null, DeviceLocation>(
    `/users/${userId}/devices/${deviceUniqueId}/metadata/location`,
    null,
  );
}
