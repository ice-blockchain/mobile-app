// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {COLORS} from '@constants/colors';
import {isLiteTeam} from '@constants/featureFlags';
import {isTeamEnabledSelector} from '@store/modules/Account/selectors';
import {
  userReferralCountSelector,
  userT1ReferralSelector,
} from '@store/modules/Referrals/selectors';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const ReferralsCell = memo(
  ({color = COLORS.white}: {color?: string}) => {
    const isTeamEnabled = useSelector(isTeamEnabledSelector);
    const refsCount = useSelector(
      isLiteTeam && !isTeamEnabled
        ? userT1ReferralSelector
        : userReferralCountSelector,
    );

    return (
      <View style={styles.container}>
        <TeamInactiveIcon color={color} width={rem(38)} height={rem(38)} />
        <View style={styles.body}>
          <Text style={[styles.titleText, {color}]}>
            {t('team.header.referrals')}
          </Text>
          <AnimatedNumberText
            style={[styles.valueText, {color}]}
            value={refsCount}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: rem(12),
  },
  body: {
    marginLeft: rem(10),
    flex: 1,
  },
  titleText: {
    ...font(12, 18, 'medium'),
    opacity: 0.7,
  },
  valueText: {
    paddingTop: rem(2),
    ...font(15, 20, 'bold'),
  },
});
