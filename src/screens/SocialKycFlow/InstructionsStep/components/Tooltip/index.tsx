// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {RoundedTriangle} from '@svg/RoundedTriangle';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onCopy: () => void;
  isTextCopied: boolean;
};

const ROUNDED_TRIANGLE_SIZE = rem(16);

export function Tooltip({onCopy, isTextCopied}: Props) {
  return (
    <Touchable style={styles.outerContainer} onPress={onCopy}>
      <RoundedTriangle
        fill={COLORS.primaryDark}
        width={ROUNDED_TRIANGLE_SIZE}
        height={ROUNDED_TRIANGLE_SIZE}
        style={styles.triangle}
      />
      <View style={styles.container}>
        <Text style={styles.text}>
          {isTextCopied
            ? t('social_kyc.instructions_step.tooltips.copied')
            : t('social_kyc.instructions_step.tooltips.tap_to_copy')}
        </Text>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(16),
    minHeight: rem(28),
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: rem(16),
  },
  text: {
    ...font(14, 20, 'medium', 'white', 'center'),
  },
  triangle: {
    top: rem(8),
  },
});
