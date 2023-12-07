// SPDX-License-Identifier: ice License 1.0

import {ViewMeasurementsResult} from '@ice/react-native';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useRef} from 'react';
import {View} from 'react-native';

export const useVerifiedTooltip = (correctiveOffset?: number) => {
  const chevronRef = useRef<View>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const showTooltip = async () => {
    await measureAndShow();
  };

  const measure = async () => {
    return new Promise<ViewMeasurementsResult>(resolve => {
      chevronRef.current?.measure((_, __, width, height, x, y) => {
        const measurement: ViewMeasurementsResult = {
          x,
          y,
          width,
          height,
          pageX: 0,
          pageY: 0,
        };
        resolve(measurement);
      });
    });
  };

  const measureAndShow = async () => {
    if (chevronRef.current) {
      const result = await measure();

      if (result) {
        navigation.navigate('VerifiedTooltipPopUp', {
          hostViewParams: result,
          correctiveOffset,
        });
      }
    }
  };

  return {
    chevronRef,
    showTooltip,
  };
};
