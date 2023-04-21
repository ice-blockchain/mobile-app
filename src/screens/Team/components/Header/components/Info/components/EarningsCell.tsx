// SPDX-License-Identifier: ice License 1.0

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {COLORS} from '@constants/colors';
import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {WalletIcon} from '@svg/WalletIcon';
import {t} from '@translations/i18n';
import {formatNumberString, parseNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const EarningsCell = memo(({color = COLORS.white}: {color?: string}) => {
  const balanceSummary = useSelector(balanceSummarySelector);

  const animatedBalanceSummaryTotalReferrals = useAnimatedNumber(
    parseNumber(balanceSummary?.totalReferrals || '0'),
    initialValue => formatNumberString(String(initialValue)),
  );

  return (
    <View style={styles.container}>
      <WalletIcon width={rem(25)} height={rem(25)} color={color} />
      <View style={styles.body2}>
        <Text style={[styles.titleText, {color}]}>
          {t('team.header.earnings')}
        </Text>
        <View style={styles.bodyContainer}>
          <FormattedNumber
            number={animatedBalanceSummaryTotalReferrals}
            bodyStyle={[styles.valueText, {color}]}
            decimalsStyle={[styles.decimalsText, {color}]}
            trim={true}
          />
          <Text style={[styles.valueText, {color}]}> {t('general.ice')}</Text>
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
    paddingRight: rem(5),
  },
  body2: {
    marginLeft: rem(14),
    justifyContent: 'center',
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...font(12, 18, 'medium'),
    opacity: 0.7,
  },
  valueText: {
    paddingTop: rem(2),
    ...font(15, 18, 'bold'),
  },
  decimalsText: {
    ...font(8, 8, 'semibold'),
  },
});
