// SPDX-License-Identifier: ice License 1.0

import {cameraRatioSelector} from '@store/modules/FaceRecognition/selectors';
import {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {LayoutChangeEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import {useSelector} from 'react-redux';
import {screenWidth} from 'rn-units';

/**
 * For devices with height > width * cameraRatio.
 * For such devices the camera feed might not take the whole app window height.
 * And for such devices we calculate the bottom margin for the bottom absolutely positioned action components,
 * so that those components still on top on the camera feed
 */
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
