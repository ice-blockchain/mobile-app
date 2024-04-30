// SPDX-License-Identifier: ice License 1.0

import {useLabelAnimation} from '@components/Inputs/CommonInput/hooks/useLabelAnimation';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import {isRTL, t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {ReactNode, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {isAndroid, rem} from 'rn-units';

export type CommonInputProps = TextInputProps & {
  label: string;
  value: string;
  errorText?: string | null;
  validated?: boolean;
  loading?: boolean;
  onValueChange?: (v: string) => void;
  onChange?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  icon?: ReactNode;
  prefix?: ReactNode;
  postfix?: ReactNode;
  reversed?: boolean;
  showChangeLabel?: boolean;
};

export const CommonInput = ({
  label,
  value,
  errorText,
  validated,
  loading,
  icon,
  prefix,
  postfix,
  onChange,
  onBlur,
  onFocus,
  onChangeText,
  containerStyle,
  editable = true,
  reversed,
  showChangeLabel = true,
  style,
  ...textInputProps
}: CommonInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const {animatedStyle} = useLabelAnimation(isFocused, value);

  return (
    <TouchableWithoutFeedback
      disabled={!editable}
      onPress={() => (onChange ? onChange() : inputRef?.current?.focus())}>
      <View
        style={[
          styles.container,
          isFocused && styles.container_focused,
          !!errorText && styles.container_error,
          reversed && styles.reversedRow,
          containerStyle,
        ]}>
        {icon}
        <View style={styles.body}>
          <View
            style={[styles.inputWrapper, reversed ? styles.reversedRow : null]}>
            {prefix}
            {onChange ? (
              <Text style={styles.input} {...textInputProps}>
                {value}
              </Text>
            ) : (
              <TextInput
                value={value}
                style={[styles.input, style]}
                ref={inputRef}
                autoCorrect={false}
                autoComplete={'off'}
                autoCapitalize={'none'}
                spellCheck={false}
                editable={editable}
                // disables autocomplete on Android, source: https://github.com/facebook/react-native/issues/18457
                keyboardType={isAndroid ? 'visible-password' : 'default'}
                onBlur={event => {
                  setIsFocused(false);
                  onBlur?.(event);
                }}
                onFocus={event => {
                  setIsFocused(true);
                  onFocus?.(event);
                }}
                onChangeText={newValue => {
                  onChangeText?.(newValue);
                }}
                {...textInputProps}
              />
            )}
          </View>
          <Animated.Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={[
              styles.label,
              errorText ? styles.label_error : null,
              reversed ? styles.reversedLabel : null,
              animatedStyle,
            ]}>
            {errorText || label}
          </Animated.Text>
        </View>
        {onChange && showChangeLabel && (
          <Touchable
            style={styles.edit}
            onPress={onChange}
            disabled={!editable}>
            <Text style={styles.editText}>
              {t('button.change').toUpperCase()}
            </Text>
          </Touchable>
        )}
        {loading && <ActivityIndicator />}
        {(!!errorText || validated) && !loading && (
          <View
            style={[
              styles.result,
              errorText ? styles.result_error : styles.result_validated,
            ]}>
            {errorText ? (
              <Text style={styles.resultErrorIcon}>!</Text>
            ) : (
              <CheckMarkThinIcon width={rem(10)} height={rem(10)} />
            )}
          </View>
        )}
        {postfix}
      </View>
    </TouchableWithoutFeedback>
  );
};

const RESULT_ICON_SIZE = rem(20);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(20),
    height: rem(56),
    borderWidth: 1,
    borderRadius: rem(16),
    backgroundColor: COLORS.wildSand,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.wildSand,
  },
  container_error: {
    borderColor: COLORS.attention,
  },
  reversedRow: {
    flexDirection: 'row-reverse',
  },
  container_focused: {
    borderColor: COLORS.congressBlue,
  },
  body: {
    flex: 1,
    marginStart: rem(10),
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(14),
  },
  input: {
    ...font(16, 21, 'medium', 'primaryDark', isRTL ? 'right' : 'left'),
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  label: {
    position: 'absolute',
    left: 0,
    ...font(16, 21, 'medium', 'secondary'),
  },
  reversedLabel: {
    left: undefined, // unset left from label style
    right: 0,
  },
  label_error: {
    color: COLORS.attention,
  },
  edit: {
    justifyContent: 'center',
  },
  editText: {
    ...font(12, 20, 'heavy', 'primaryDark'),
  },
  result: {
    width: RESULT_ICON_SIZE,
    height: RESULT_ICON_SIZE,
    borderRadius: RESULT_ICON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultErrorIcon: {
    ...font(14, 20, 'black'),
  },
  result_error: {
    backgroundColor: COLORS.attention,
  },
  result_validated: {
    backgroundColor: COLORS.shamrock,
  },
});
