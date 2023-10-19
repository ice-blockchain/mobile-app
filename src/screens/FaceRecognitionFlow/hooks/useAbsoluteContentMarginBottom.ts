// SPDX-License-Identifier: ice License 1.0

import {cameraRatioSelector} from '@store/modules/FaceRecognition/selectors';
import {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {LayoutChangeEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import {useSelector} from 'react-redux';
import {screenWidth} from 'rn-units';

export function useAbsoluteContentMarginBottom() {
  const [marginBottom, setMarginBottom] = useState(0);
  const cameraRatio = useSelector(cameraRatioSelector);
  const onMainContainerLayout = useCallback(
    ({nativeEvent}: LayoutChangeEvent) => {
      setMarginBottom(
        Math.max(
          0,
          nativeEvent.layout.height -
            screenWidth * (cameraRatio === '16:9' ? 16 / 9 : 4 / 3),
        ),
      );
    },
    [cameraRatio],
  );

  const marginBottomStyle = useMemo(
    () =>
      StyleSheet.create({
        marginBottom: {marginBottom},
      }),
    [marginBottom],
  );

  return {marginBottomStyle, onMainContainerLayout};
}
