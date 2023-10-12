// SPDX-License-Identifier: ice License 1.0

import {DEVICE_Y_ALLOWED_ROTATION_RADIANS} from '@constants/faceRecognition';
import {DEVICE_SENSORS_UPDATE_INTERVAL_MS} from '@constants/timeouts';
import {hapticFeedback} from '@utils/device';
import {DeviceMotion} from 'expo-sensors';
import {useEffect, useState} from 'react';

export const useIsDeviceAngleAllowed = () => {
  const [isAllowed, setIsAllowed] = useState<boolean>(true);

  useEffect(() => {
    let subscription: {remove: () => void} | null = null;
    DeviceMotion.isAvailableAsync().then(isAvailable => {
      if (isAvailable) {
        DeviceMotion.setUpdateInterval(DEVICE_SENSORS_UPDATE_INTERVAL_MS);
        subscription = DeviceMotion.addListener(({rotation}) => {
          // Despite the typing, `rotation` is null on android during the camera permissions dialog
          if (rotation) {
            setIsAllowed(rotation.beta > DEVICE_Y_ALLOWED_ROTATION_RADIANS);
          }
        });
      }
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (!isAllowed) {
      const interval = setInterval(hapticFeedback, 1000);
      return () => clearInterval(interval);
    }
  }, [isAllowed]);

  return isAllowed;
};
