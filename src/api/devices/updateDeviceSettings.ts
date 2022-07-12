// SPDX-License-Identifier: BUSL-1.1

import {patch} from '@api/client';
import {DeviceId, DeviceSettings} from '@api/devices/types';
import {DeepPartial} from 'redux';

interface Params {
  deviceId: DeviceId;
  settings: DeepPartial<DeviceSettings>;
}

export function updateDeviceSettings({
  deviceId: {userId, deviceUniqueId},
  settings,
}: Params) {
  return patch<DeepPartial<DeviceSettings>, DeviceSettings>(
    `/users/${userId}/devices/${deviceUniqueId}/settings`,
    {
      ...settings,
    },
  );
}
