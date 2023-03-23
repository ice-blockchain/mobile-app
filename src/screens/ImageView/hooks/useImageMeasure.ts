// SPDX-License-Identifier: ice License 1.0

import {RefObject, useEffect, useState} from 'react';
import {Image} from 'react-native';
import Animated from 'react-native-reanimated';

export const useImageMeasure = (
  imageRef: RefObject<Image | Animated.Image>,
  extraTopOffset: number,
) => {
  const [imageMeasure, setSourceMeasure] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>();

  useEffect(() => {
    imageRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setSourceMeasure({x: pageX, y: pageY - extraTopOffset, width, height});
    });
  }, [imageRef, extraTopOffset]);

  return {imageMeasure};
};
