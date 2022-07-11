// SPDX-License-Identifier: BUSL-1.1

import {patch} from '@api/client';
import {DeviceId, DeviceMetadata} from '@api/devices/types';
import {DeepPartial} from 'redux';

interface Params {
  deviceId: DeviceId;
  metadata: DeepPartial<DeviceMetadata>;
}

export function updateDeviceSettings({
  deviceId: {userId, deviceUniqueId},
  metadata,
}: Params) {
  return patch(`/users/${userId}/devices/${deviceUniqueId}/settings`, {
    ...metadata,
  });
}
