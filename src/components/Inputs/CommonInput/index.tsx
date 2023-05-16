// SPDX-License-Identifier: ice License 1.0

import {useLabelAnimation} from '@components/Inputs/CommonInput/hooks/useLabelAnimation';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {CheckMarkThinIcon} from '@svg/CheckMarkThinIcon';
import {t} from '@translations/i18n';
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
  style,
  ...textInputProps
}: CommonInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const {animatedStyle, onLayoutBody, onLayoutLabel} = useLabelAnimation(
    isFocused,
    value,
  );

  return (
    <TouchableWithoutFeedback
      disabled={!editable}
      onPress={() => (onChange ? onChange() : inputRef?.current?.focus())}>
      <View
        style={[
          styles.container,
          isFocused && styles.container_focused,
          !!errorText && styles.container_error,
          containerStyle,
        ]}>
        {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
        <View style={styles.body} onLayout={onLayoutBody}>
          <View style={styles.inputWrapper}>
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
              animatedStyle,
            ]}
            onLayout={onLayoutLabel}>
            {errorText || label}
          </Animated.Text>
        </View>
        {onChange && (
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
    paddingVertical: rem(12),
    paddingHorizontal: rem(16),
    minHeight: rem(56),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: rem(16),
    borderColor: COLORS.wildSand,
    backgroundColor: COLORS.wildSand,
  },
  container_error: {
    borderColor: COLORS.attention,
  },
  container_focused: {
    borderColor: COLORS.congressBlue,
  },
  iconContainer: {
    marginRight: rem(10),
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(14),
  },
  input: {
    ...font(16, 20, 'medium', 'primaryDark'),
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 0,
    ...font(16, 20, 'medium', 'secondary'),
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
