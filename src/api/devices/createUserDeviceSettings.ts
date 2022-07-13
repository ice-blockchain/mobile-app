// SPDX-License-Identifier: BUSL-1.1

import {post} from '@api/client';
import {DeviceId, DeviceSettings} from '@api/devices/types';
import {DeepPartial} from 'redux';

export function createUserDeviceSettings(
  {userId, deviceUniqueId}: DeviceId,
  settings: DeepPartial<DeviceSettings>,
) {
  return post<DeepPartial<DeviceSettings>, DeviceSettings>(
    `/users/${userId}/devices/${deviceUniqueId}/settings`,
    settings,
  );
}
