// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {rem} from 'rn-units';
import {FONTS, WEIGHTS} from '@constants/fonts';
import {COLORS} from '@constants/colors';
import {translate} from '@utils/i18n';
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
      <Text style={styles.text}>{translate('button.not_now_btn')}</Text>
    </TouchableOpacity>
  );
};

export default NotNowButton;

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
