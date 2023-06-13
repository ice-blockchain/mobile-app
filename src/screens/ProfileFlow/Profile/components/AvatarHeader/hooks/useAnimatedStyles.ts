// SPDX-License-Identifier: ice License 1.0

import {HEADER_HEIGHT} from '@navigation/components/Header';
import {AVATAR_SIZE} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {ViewStyle} from 'react-native';
import {
  AnimatedStyleProp,
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const AVATAR_RADIUS = rem(41);
const AVATAR_SMALL_SIZE = rem(36);
const AVATAR_SMALL_RADIUS = rem(16);
const SCROLL_STEP_1 = 0.87;
const MAX_SCROLL = 1;
export const PEN_SIZE = rem(32);

type Params = {
  animatedIndex: SharedValue<number>;
  navigationContainerLeftWidth: number;
  navigationContainerRightWidth: number;
  wrapperWidth: number;
  titleTextWidth: number;
};

export const useAnimatedStyles = ({
  animatedIndex,
  navigationContainerRightWidth,
  navigationContainerLeftWidth,
  wrapperWidth,
  titleTextWidth,
}: Params) => {
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const size = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [AVATAR_SIZE, AVATAR_SMALL_SIZE],
      Extrapolate.CLAMP,
    );

    const borderWidth = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [5, 0],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [AVATAR_RADIUS, AVATAR_SMALL_RADIUS],
      Extrapolate.CLAMP,
    );

    const marginTop = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [AVATAR_SIZE / 2 + HEADER_HEIGHT / 2 + 8, 0],
      Extrapolate.CLAMP,
    );

    return {
      height: size,
      width: size,
      borderWidth,
      borderRadius,
      marginTop,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const titleWidthExpanded = AVATAR_SIZE;
    const titleWidthCollapsed = AVATAR_SMALL_SIZE + 12 + titleTextWidth;

    const getDesirablePositionX = (titleContainerWidth: number) =>
      (navigationContainerLeftWidth +
        wrapperWidth +
        navigationContainerRightWidth -
        titleContainerWidth) /
        2 -
      navigationContainerLeftWidth;

    const getTranslateX = (titleContainerWidth: number) =>
      getDesirablePositionX(titleContainerWidth) -
      (wrapperWidth - titleContainerWidth);

    const translateXCollapsed = getTranslateX(titleWidthCollapsed);

    return {
      transform: [
        {
          translateX: interpolate(
            animatedIndex.value,
            [0, MAX_SCROLL],
            [
              getTranslateX(titleWidthExpanded),
              translateXCollapsed > 0 ? 0 : translateXCollapsed,
            ],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const penAnimatedStyle = useAnimatedStyle(() => {
    const size = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL / 2],
      [PEN_SIZE, 0],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL / 2],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {
      height: size,
      width: size,
      opacity,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [0.81, SCROLL_STEP_1],
      [0, 1],
      Extrapolate.CLAMP,
    );

    const fontSize = interpolate(
      animatedIndex.value,
      [0, SCROLL_STEP_1],
      [0.01, 17],
      Extrapolate.CLAMP,
    );

    const marginLeft = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [0, 12],
      Extrapolate.CLAMP,
    );

    return {opacity, fontSize, marginLeft};
  });

  const lettersAvatarStyle: AnimatedStyleProp<ViewStyle> = useAnimatedStyle(
    () => {
      const opacity = interpolate(
        animatedIndex.value,
        [0, MAX_SCROLL / 2],
        [1, 0],
        Extrapolate.CLAMP,
      );

      return {opacity};
    },
  );

  const iconAvatarStyle: AnimatedStyleProp<ViewStyle> = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {opacity};
  });

  return {
    titleAnimatedStyle,
    imageAnimatedStyle,
    penAnimatedStyle,
    textStyle,
    lettersAvatarStyle,
    iconAvatarStyle,
  };
};
