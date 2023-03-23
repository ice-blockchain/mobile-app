// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {SearchIcon} from '@svg/SearchIcon';
import {font} from '@utils/styles';
import React, {forwardRef, Ref, useState} from 'react';
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
import {rem} from 'rn-units';

interface SearchInputProps extends TextInputProps {
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SEARCH_INPUT_HEIGHT = rem(46);

export const SearchInput = forwardRef(
  (
    {containerStyle, onFocus, onBlur, ...textInputProps}: SearchInputProps,
    forwardedRef: Ref<TextInput>,
  ) => {
    const [focused, setFocused] = useState(false);
    return (
      <View
        style={[
          styles.container,
          focused ? styles.container_focused : null,
          containerStyle,
        ]}>
        <View style={styles.searchButton}>
          <SearchIcon
            width={rem(24)}
            height={rem(24)}
            color={COLORS.secondary}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.secondary}
          onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setFocused(false);
            onBlur?.(e);
          }}
          ref={forwardedRef}
          {...textInputProps}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.wildSand,
    borderRadius: rem(16),
    borderWidth: 1,
    borderColor: COLORS.wildSand,
  },
  container_focused: {
    borderColor: COLORS.primaryDark,
  },
  input: {
    paddingLeft: rem(46),
    height: SEARCH_INPUT_HEIGHT,
    ...font(16, 21, 'medium', 'primaryDark'),
  },
  searchButton: {
    justifyContent: 'center',
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
  },
});
