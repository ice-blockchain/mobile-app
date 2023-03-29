// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {HEADER_HEIGHT} from '@navigation/components/Header';
import {AVATAR_SIZE} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {ViewStyle} from 'react-native';
import {
  AnimatedStyleProp,
  Extrapolate,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

export const AVATAR_RADIUS = rem(41);
const AVATAR_SMALL_SIZE = rem(36);
const AVATAR_SMALL_RADIUS = rem(16);
const SCROLL_STEP_1 = 140;
const MAX_SCROLL = 160;
export const PEN_SIZE = rem(32);

type Params = {
  scrollY: SharedValue<number>;
};

export const useAnimatedStyles = ({scrollY}: Params) => {
  const imageSize = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, MAX_SCROLL],
      [AVATAR_SIZE, AVATAR_SMALL_SIZE],
      Extrapolate.CLAMP,
    ),
  );

  const penSize = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, MAX_SCROLL / 2],
      [PEN_SIZE, 0],
      Extrapolate.CLAMP,
    ),
  );

  const marginTop = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, MAX_SCROLL],
      [AVATAR_SIZE / 2 + HEADER_HEIGHT / 2 + 8, 0],
      Extrapolate.CLAMP,
    ),
  );

  const borderWidth = useDerivedValue(() =>
    interpolate(scrollY.value, [0, MAX_SCROLL], [5, 0], Extrapolate.CLAMP),
  );

  const borderRadius = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, MAX_SCROLL],
      [AVATAR_RADIUS, AVATAR_SMALL_RADIUS],
      Extrapolate.CLAMP,
    ),
  );

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: imageSize.value,
      width: imageSize.value,
      borderWidth: borderWidth.value,
      borderRadius: borderRadius.value,
      marginTop: marginTop.value,
    };
  });

  const penOpacity = useDerivedValue(() =>
    interpolate(scrollY.value, [0, MAX_SCROLL / 2], [1, 0], Extrapolate.CLAMP),
  );

  const penAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: penSize.value,
      width: penSize.value,
      opacity: penOpacity.value,
    };
  });

  const textOpacity = useDerivedValue(() =>
    interpolate(scrollY.value, [130, SCROLL_STEP_1], [0, 1], Extrapolate.CLAMP),
  );

  const lettersAvatarOpacity = useDerivedValue(() =>
    interpolate(scrollY.value, [0, 5], [1, 0], Extrapolate.CLAMP),
  );

  const fontSize = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, SCROLL_STEP_1],
      [0.01, 17],
      Extrapolate.CLAMP,
    ),
  );

  const marginLeft = useDerivedValue(() =>
    interpolate(scrollY.value, [0, MAX_SCROLL], [0, 12], Extrapolate.CLAMP),
  );

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    fontSize: fontSize.value,
    marginLeft: marginLeft.value,
  }));

  const lettersAvatarStyle: AnimatedStyleProp<ViewStyle> = useAnimatedStyle(
    () => ({
      opacity: lettersAvatarOpacity.value,
    }),
  );

  const iconAnimatedColor = useDerivedValue(() =>
    interpolateColor(
      scrollY.value,
      [0, MAX_SCROLL],
      [COLORS.primaryDark, COLORS.alabaster],
    ),
  );

  return {
    imageAnimatedStyle,
    penAnimatedStyle,
    textStyle,
    lettersAvatarStyle,
    iconAnimatedColor,
  };
};
