// SPDX-License-Identifier: ice License 1.0

import {DEVICE_Y_ALLOWED_ROTATION_RADIANS} from '@constants/faceRecognition';
import {
  DEVICE_ANGLE_WARNING_FEEDBACK_INTERVAL_MS,
  DEVICE_SENSORS_UPDATE_INTERVAL_MS,
} from '@constants/timeouts';
import {hapticFeedback} from '@utils/device';
import {useEffect, useState} from 'react';
import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';

export const useIsDeviceAngleAllowed = () => {
  const [isAllowed, setIsAllowed] = useState<boolean>(true);

  useEffect(() => {
    setUpdateIntervalForType(
      SensorTypes.accelerometer,
      DEVICE_SENSORS_UPDATE_INTERVAL_MS,
    );
    const subscription = accelerometer.subscribe(data => {
      if (data?.y != null) {
        const gravity = 9.81;
        setIsAllowed(
          Math.abs(data.y) > gravity - DEVICE_Y_ALLOWED_ROTATION_RADIANS,
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isAllowed) {
      const interval = setInterval(
        hapticFeedback,
        DEVICE_ANGLE_WARNING_FEEDBACK_INTERVAL_MS,
      );
      return () => clearInterval(interval);
    }
  }, [isAllowed]);

  return isAllowed;
};
