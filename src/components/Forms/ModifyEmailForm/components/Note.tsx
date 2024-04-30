// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {InfoIcon} from '@svg/InfoIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const Note = () => {
  return (
    <View style={styles.container}>
      <InfoIcon width={rem(20)} height={rem(20)} color={COLORS.catalinaBlue} />
      <Text
        style={styles.infoText}
        numberOfLines={3}
        adjustsFontSizeToFit={true}>
        {t('confirm_email.note')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rem(16),
    marginRight: rem(18),
  },
  infoText: {
    marginLeft: rem(14),
    ...font(13, 18, 'regular', 'secondary'),
  },
});
