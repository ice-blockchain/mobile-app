// SPDX-License-Identifier: ice License 1.0

import {HEADER_HEIGHT} from '@navigation/components/Header';
import {AVATAR_SIZE} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {VERIFIED_SIZE} from '@screens/ProfileFlow/Profile/components/AvatarHeader/constants';
import {isRTL} from '@translations/i18n';
import {ViewStyle} from 'react-native';
import {
  AnimatedStyleProp,
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const TEXT_MARGIN_LEFT = rem(12);
export const CHEVRON_MARGIN = rem(4);
export const AVATAR_RADIUS = rem(41);
export const AVATAR_SMALL_SIZE = rem(36);
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
  const imageSize = useDerivedValue(() =>
    interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [AVATAR_SIZE, AVATAR_SMALL_SIZE],
      Extrapolate.CLAMP,
    ),
  );

  const textMarginLeft = useDerivedValue(() =>
    interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [0, TEXT_MARGIN_LEFT],
      Extrapolate.CLAMP,
    ),
  );

  const chevronMargin = useDerivedValue(() =>
    interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [0, CHEVRON_MARGIN],
      Extrapolate.CLAMP,
    ),
  );

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [AVATAR_RADIUS, AVATAR_SMALL_RADIUS],
      Extrapolate.CLAMP,
    );

    const borderWidth = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [5, 0],
      Extrapolate.CLAMP,
    );

    const marginTop = interpolate(
      animatedIndex.value,
      [0, MAX_SCROLL],
      [AVATAR_SIZE / 2 + HEADER_HEIGHT / 2 + 8, 0],
      Extrapolate.CLAMP,
    );

    return {
      height: imageSize.value,
      width: imageSize.value,
      borderWidth,
      borderRadius,
      marginTop,
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    const titleTextWidthActual = interpolate(
      animatedIndex.value,
      [0, SCROLL_STEP_1],
      [0, titleTextWidth],
      Extrapolate.CLAMP,
    );

    const titleContainerWidthActual =
      imageSize.value + textMarginLeft.value + titleTextWidthActual;

    /**
     *
     * @param containerWidth - width of the container that need to be in the center of wrapper
     * @returns {number} desirable x position of the container in the wrapper
     */
    const getDesirablePositionX = (containerWidth: number): number => {
      const wholeWidth =
        navigationContainerLeftWidth +
        wrapperWidth +
        navigationContainerRightWidth;

      return (wholeWidth - containerWidth) / 2 - navigationContainerLeftWidth;
    };

    const translateXBasic =
      getDesirablePositionX(titleContainerWidthActual) -
      (wrapperWidth - titleContainerWidthActual);

    return {
      transform: [
        {
          translateX:
            (translateXBasic > 0 ? 0 : translateXBasic) * (isRTL ? -1 : 1),
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

    return {
      opacity,
      fontSize,
      marginLeft: textMarginLeft.value,
    };
  });

  const verifiedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [0.81, SCROLL_STEP_1],
      [0, 1],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      width: interpolate(
        animatedIndex.value,
        [0.81, SCROLL_STEP_1],
        [0, VERIFIED_SIZE],
        Extrapolate.CLAMP,
      ),
      marginLeft: chevronMargin.value,
      marginRight: chevronMargin.value,
    };
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
    verifiedStyle,
  };
};
