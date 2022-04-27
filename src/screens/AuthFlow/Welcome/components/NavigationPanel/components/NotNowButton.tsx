// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {FONTS, WEIGHTS} from '@constants/fonts';
import {COLORS} from '@constants/colors';
interface NotNowButtonProps {
  onPress: () => void;
  disabled: boolean;
}

const NotNowButton = ({onPress, disabled}: NotNowButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container}>
      <Text style={styles.text}>not now</Text>
    </TouchableOpacity>
  );
};

export default NotNowButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  text: {
    color: COLORS.primary,
    fontFamily: FONTS.primary.regular,
    fontWeight: WEIGHTS.medium,
  },
});
