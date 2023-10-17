// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {isLiteTeam} from '@constants/featureFlags';
import {SearchEmptyIcon} from '@svg/SearchEmptyIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const ReferralsEmptyState = () => {
  return (
    <View style={styles.container}>
      <SearchEmptyIcon
        width={rem(20)}
        height={rem(20)}
        color={COLORS.periwinkleGray}
      />

      <Text style={styles.description}>
        {isLiteTeam
          ? t('home.referrals.no_referrals_description_team')
          : t('home.referrals.no_referrals_description')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: rem(16),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginTop: rem(6),
    ...font(12, 16, 'medium', 'periwinkleGray'),
  },
});
