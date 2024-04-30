// SPDX-License-Identifier: ice License 1.0

import {cameraRatioSelector} from '@store/modules/FaceRecognition/selectors';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {screenWidth} from 'rn-units';

export function useMaxHeightStyle() {
  const cameraRatio = useSelector(cameraRatioSelector);

  return useMemo(
    () =>
      StyleSheet.create({
        maxHeight: {
          maxHeight: screenWidth * (cameraRatio === '16:9' ? 16 / 9 : 4 / 3),
        },
      }),
    [cameraRatio],
  );
}
