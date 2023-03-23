// SPDX-License-Identifier: ice License 1.0

import {Gesture} from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const MAX_ZOOM = 3;

export const useImageGesture = (
  viewPortWidth: number,
  viewPortHeight: number,
) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const positionX = useSharedValue(0);
  const savedPositionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const savedPositionY = useSharedValue(0);

  const adjustImage = () => {
    'worklet';

    if (scale.value < 1) {
      scale.value = withTiming(1);
      savedScale.value = 1;
    } else if (scale.value > MAX_ZOOM) {
      scale.value = withTiming(MAX_ZOOM);
      savedScale.value = MAX_ZOOM;
    } else {
      savedScale.value = scale.value;
    }

    // if the scaled image takes more space than viewPortHeight
    if (viewPortWidth * savedScale.value > viewPortHeight) {
      const verticalSpace =
        viewPortHeight / 2 - (viewPortWidth / 2) * savedScale.value;
      // if there is blank space on the top -> align the image to the top border
      if (verticalSpace > -positionY.value * savedScale.value) {
        const topY = -verticalSpace / savedScale.value;
        positionY.value = withTiming(topY);
        savedPositionY.value = topY;
        // if there is blank space on the bottom -> align the image to the bottom border
      } else if (verticalSpace > positionY.value * savedScale.value) {
        const bottomY = verticalSpace / savedScale.value;
        positionY.value = withTiming(bottomY);
        savedPositionY.value = bottomY;
      } else {
        savedPositionY.value = positionY.value;
      }
      // if the image takes less space than viewPortHeight -> align it vertically to the center
    } else {
      positionY.value = withTiming(0);
      savedPositionY.value = 0;
    }

    // if the image is scaled -> it takes more space than viewPortWidth
    if (savedScale.value > 1) {
      const horizontalSpace =
        viewPortWidth / 2 - (viewPortWidth / 2) * savedScale.value;
      // if there is blank space on the right -> align the image to the right border
      if (horizontalSpace > positionX.value * savedScale.value) {
        const rightX = horizontalSpace / savedScale.value;
        positionX.value = withTiming(rightX);
        savedPositionX.value = rightX;
        // if there is blank space on the left -> align the image to the left border
      } else if (horizontalSpace > -positionX.value * savedScale.value) {
        const leftX = -horizontalSpace / savedScale.value;
        positionX.value = withTiming(leftX);
        savedPositionX.value = leftX;
      } else {
        savedPositionX.value = positionX.value;
      }
      // if the image takes less space than viewPortWidth -> align it horizontally to the center
    } else {
      positionX.value = withTiming(0);
      savedPositionX.value = 0;
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      positionX.value = savedPositionX.value + e.translationX / scale.value;
      positionY.value = savedPositionY.value + e.translationY / scale.value;
    })
    .onEnd(adjustImage);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(adjustImage);

  const animatedGestureStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: positionX.value},
      {translateY: positionY.value},
    ],
  }));

  return {
    gesture: Gesture.Simultaneous(pinchGesture, panGesture),
    animatedGestureStyle,
  };
};
