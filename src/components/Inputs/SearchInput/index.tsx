// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SearchIcon} from '@svg/SearchIcon';
import {isRTL} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface SearchInputProps extends TextInputProps {
  loading?: boolean;
  focused?: Animated.SharedValue<number>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SEARCH_INPUT_HEIGHT = rem(46);

export const SearchInput = forwardRef(
  (
    {
      containerStyle,
      onFocus,
      onBlur,
      focused: propsFocused,
      ...textInputProps
    }: SearchInputProps,
    forwardedRef: Ref<TextInput | null>,
  ) => {
    const refTextInput = useRef<TextInput>(null);

    const focused = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        borderColor: interpolateColor(
          focused.value,
          [0, 1],
          [COLORS.wildSand, COLORS.primaryDark],
        ),
      };
    }, []);

    const onFocusInputField = useCallback(() => {
      refTextInput.current?.focus();
    }, []);

    useImperativeHandle(forwardedRef, () => refTextInput.current);

    return (
      <AnimatedTouchableOpacity
        style={[styles.container, animatedStyle, containerStyle]}
        activeOpacity={1}
        onPress={onFocusInputField}>
        <SearchIcon width={rem(20)} height={rem(20)} color={COLORS.secondary} />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.secondary}
          onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            focused.value = withSpring(1);
            if (propsFocused) {
              propsFocused.value = withSpring(1);
            }
            onFocus?.(e);
          }}
          onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            focused.value = withSpring(0);
            if (propsFocused) {
              propsFocused.value = withSpring(0);
            }
            onBlur?.(e);
          }}
          ref={refTextInput}
          {...textInputProps}
        />
      </AnimatedTouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.wildSand,
    borderRadius: rem(16),
    paddingHorizontal: rem(16),
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingLeft: rem(8),
    justifyContent: 'center',
    alignSelf: 'center',
    height: SEARCH_INPUT_HEIGHT,
    ...font(16, 21, 'medium', 'primaryDark', isRTL ? 'right' : 'left'),
  },
});
