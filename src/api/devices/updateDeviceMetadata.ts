// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';
import {DeviceId, DeviceMetadata} from '@api/devices/types';

interface Params {
  deviceId: DeviceId;
  metadata: DeviceMetadata;
}

/**
 * Replaces existing device metadata with the provided one.
 */

export function updateDeviceMetadata({
  deviceId: {userId, deviceUniqueId},
  metadata,
}: Params) {
  return put(`/users/${userId}/devices/${deviceUniqueId}/metadata`, {
    ...metadata,
  });
}
