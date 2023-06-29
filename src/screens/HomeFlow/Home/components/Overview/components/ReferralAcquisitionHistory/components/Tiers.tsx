// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {CircleIcon} from '@svg/CircleIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const Tiers = () => {
  return (
    <View style={styles.body}>
      <View style={styles.tierContainer}>
        <CircleIcon fill={COLORS.shamrock} />
        <Text style={styles.tier1Text}>{t('users.referralType.T1')}</Text>
      </View>
      <View style={styles.tierContainer}>
        <CircleIcon fill={COLORS.white} />
        <Text style={styles.tier2Text}>{t('users.referralType.T2')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tierContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: rem(17),
  },
  tier1Text: {
    ...font(12, 16, 'medium', 'shamrock'),
  },
  tier2Text: {
    ...font(12, 16, 'medium', 'white'),
  },
});
