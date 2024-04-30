// SPDX-License-Identifier: ice License 1.0

import {DEVICE_Y_ALLOWED_ROTATION_RADIANS} from '@constants/faceRecognition';
import {
  DEVICE_ANGLE_WARNING_FEEDBACK_INTERVAL_MS,
  DEVICE_SENSORS_UPDATE_INTERVAL_MS,
} from '@constants/timeouts';
import {hapticFeedback} from '@utils/device';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';

const GRAVITY = 9.81;
const THRESHOLD =
  Platform.OS === 'ios'
    ? -Math.sin(DEVICE_Y_ALLOWED_ROTATION_RADIANS)
    : GRAVITY - DEVICE_Y_ALLOWED_ROTATION_RADIANS;

export const useIsDeviceAngleAllowed = (isReady: boolean) => {
  const [isAllowed, setIsAllowed] = useState<boolean>(true);

  useEffect(() => {
    setUpdateIntervalForType(
      SensorTypes.accelerometer,
      DEVICE_SENSORS_UPDATE_INTERVAL_MS,
    );
    const subscription = accelerometer.subscribe({
      next: data => {
        if (data?.y != null) {
          setIsAllowed(
            Platform.OS === 'ios'
              ? data.y < THRESHOLD
              : Math.abs(data.y) > THRESHOLD,
          );
        }
      },
      // ignoring "accelerometer is not available" error
      error: () => null,
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isAllowed && isReady) {
      const interval = setInterval(
        hapticFeedback,
        DEVICE_ANGLE_WARNING_FEEDBACK_INTERVAL_MS,
      );
      return () => clearInterval(interval);
    }
  }, [isAllowed, isReady]);

  return isAllowed;
};
