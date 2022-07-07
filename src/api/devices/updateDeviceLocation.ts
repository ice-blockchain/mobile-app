// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';

interface Params {
  userId: string;
  deviceUniqueId: string;
}

/**
 * Returns the device's geolocation based on its IP
 * or based on account information if userId is also provided.
 */

export function updateDeviceLocation({userId, deviceUniqueId}: Params) {
  return put(
    `/users/${userId}/devices/${deviceUniqueId}/metadata/location`,
    {},
  );
}
