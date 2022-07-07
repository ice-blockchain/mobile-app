// SPDX-License-Identifier: BUSL-1.1

import {put} from '@api/client';
import {DeviceMetadata} from '@api/devices/types';

interface Params {
  userId: string;
  deviceUniqueId: string;
  metadata: DeviceMetadata;
}

/**
 * Replaces existing device metadata with the provided one.
 */

export function updateDeviceMetadata({
  userId,
  deviceUniqueId,
  metadata,
}: Params) {
  return put(`/users/${userId}/devices/${deviceUniqueId}/metadata`, {
    ...metadata,
  });
}
