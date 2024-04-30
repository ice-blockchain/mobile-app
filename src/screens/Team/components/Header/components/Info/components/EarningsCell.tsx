// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {COLORS} from '@constants/colors';
import {isLiteTeam} from '@constants/featureFlags';
import {isTeamEnabledSelector} from '@store/modules/Account/selectors';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {WalletIcon} from '@svg/WalletIcon';
import {isRTL, t} from '@translations/i18n';
import {parseNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const EarningsCell = memo(({color = COLORS.white}: {color?: string}) => {
  const balanceSummary = useSelector(balanceSummarySelector);
  const isTeamEnabled = useSelector(isTeamEnabledSelector);

  const NumberComponent = useCallback(
    ({animatedValue}: {animatedValue: number}) => {
      return (
        <FormattedNumber
          number={animatedValue}
          bodyStyle={[styles.valueText, {color}]}
          decimalsStyle={[styles.decimalsText, {color}]}
          trim={true}
        />
      );
    },
    [color],
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.icon}>
          <WalletIcon width={rem(25)} height={rem(25)} color={color} />
        </View>
        <View style={styles.body2}>
          <Text style={[styles.titleText, {color}]}>
            {t('team.header.earnings')}
          </Text>
          <View style={styles.bodyContainer}>
            <AnimatedNumberText
              value={parseNumber(
                (isLiteTeam && !isTeamEnabled
                  ? balanceSummary?.t1
                  : balanceSummary?.totalReferrals) || '0',
              )}
              NumberComponent={NumberComponent}
            />
            <Text> </Text>
            <Text style={[styles.valueText, {color}]}>{t('general.ice')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: rem(12),
    width: '100%',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  icon: {
    alignItems: 'flex-end',
  },
  body2: {
    paddingLeft: rem(12),
    alignItems: 'flex-end',
    maxWidth: '80%',
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...font(12, 18, 'medium'),
    opacity: 0.7,
    textAlign: isRTL ? 'left' : 'right',
  },
  valueText: {
    paddingTop: rem(2),
    ...font(15, 20, 'bold'),
  },
  decimalsText: {
    ...font(8, 8, 'semibold'),
  },
});
