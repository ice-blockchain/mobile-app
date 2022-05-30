// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS, WEIGHTS} from '@constants/fonts';
import {translate} from '@utils/i18n';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {rem} from 'rn-units';
interface NotNowButtonProps {
  onPress?: () => void;
  disabled: boolean;
}

export const NotNowButton = ({onPress, disabled}: NotNowButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container}>
      <Text style={styles.text}>{translate('button.not_now_btn')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(18),
    paddingVertical: rem(12),
  },
  text: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.primary.regular,
    fontWeight: WEIGHTS.medium,
  },
});
