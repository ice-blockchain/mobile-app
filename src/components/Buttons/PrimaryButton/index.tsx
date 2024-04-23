// SPDX-License-Identifier: ice License 1.0

import {ActivityIndicator} from '@components/ActivityIndicator';
import {Touchable, TouchableProps} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {font} from '@utils/styles';
import React, {ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {rem} from 'rn-units';

export const INDICATOR_SIDE_DIMENSION = rem(24);

export interface PrimaryButtonProps extends TouchableProps {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  customBackground?: boolean;
}

export const PrimaryButton = ({
  onPress,
  text,
  style = {},
  textStyle = {},
  icon,
  loading = false,
  disabled = false,
  customBackground = false,
  ...touchableProps
}: PrimaryButtonProps) => {
  const angle = 256;
  const radians = ((angle - 90) * Math.PI) / 180; // Adjusting by 90 degrees because CSS gradients start from the bottom
  const x1 = Math.cos(radians); // end point x (cosine)
  const y1 = Math.sin(radians); // end point y (sine)
  return (
    <Touchable
      onPress={!loading ? onPress : undefined}
      style={[styles.button, disabled && styles.button_disabled, style]}
      {...touchableProps}
      disabled={disabled}>
      {style &&
        !('backgroundColor' in style) &&
        !disabled &&
        !customBackground && (
          <LinearGradient
            start={{x: 0.5, y: 0.5}} // center
            end={{x: 0.5 + x1, y: 0.5 + y1}} // calculating end point based on the center
            colors={[
              COLORS.primaryButtonGradientStart,
              COLORS.primaryButtonGradientEnd,
            ]}
            locations={[0, 0.5]}
            style={StyleSheet.absoluteFill}
          />
        )}
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.text, textStyle]}>{text}</Text>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator theme="dark-content" style={styles.indicator} />
        </View>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: rem(60),
    borderRadius: rem(20),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button_disabled: {
    backgroundColor: COLORS.secondary,
  },
  icon: {
    marginLeft: rem(10),
  },
  text: {
    marginHorizontal: rem(10),
    ...font(17, 22, 'semibold', 'white', 'center'),
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: rem(15),
    width: INDICATOR_SIDE_DIMENSION,
    justifyContent: 'center',
  },
  indicator: {
    width: INDICATOR_SIDE_DIMENSION,
    height: INDICATOR_SIDE_DIMENSION,
  },
});
