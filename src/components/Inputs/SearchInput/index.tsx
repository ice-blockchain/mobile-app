// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SearchIcon} from '@svg/SearchIcon';
import {isRTL} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {forwardRef, Ref} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {rem} from 'rn-units';

interface SearchInputProps extends TextInputProps {
  loading?: boolean;
  focused?: Animated.SharedValue<number>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SEARCH_INPUT_HEIGHT = rem(46);

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const SearchInput = forwardRef(
  (
    {
      containerStyle,
      onFocus,
      onBlur,
      focused: propsFocused,
      ...textInputProps
    }: SearchInputProps,
    forwardedRef: Ref<TextInput>,
  ) => {
    const focused = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        borderColor: interpolateColor(
          focused.value,
          [0, 1],
          [COLORS.wildSand, COLORS.primaryDark],
        ),
      };
    });
    return (
      <Animated.View style={[styles.container, animatedStyle, containerStyle]}>
        <View style={styles.searchButton}>
          <SearchIcon
            width={rem(24)}
            height={rem(24)}
            color={COLORS.secondary}
          />
        </View>
        <AnimatedTextInput
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
          ref={forwardedRef}
          {...textInputProps}
        />
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.wildSand,
    borderRadius: rem(16),
    borderWidth: 1,
  },
  input: {
    paddingLeft: rem(46),
    height: SEARCH_INPUT_HEIGHT,
    ...font(16, 21, 'medium', 'primaryDark', isRTL ? 'right' : 'left'),
  },
  searchButton: {
    justifyContent: 'center',
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
  },
});
