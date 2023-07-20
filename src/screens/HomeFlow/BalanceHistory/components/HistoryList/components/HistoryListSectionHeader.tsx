// SPDX-License-Identifier: ice License 1.0

import {BalanceDiff} from '@api/tokenomics/types';
import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {dayjs} from '@services/dayjs';
import {CalendarIcon} from '@svg/CalendarIcon';
import {StarIcon} from '@svg/StarIcon';
import {isRTL} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  balanceDiff: BalanceDiff;
  time: string;
};

export const HistoryListSectionHeader = ({balanceDiff, time}: Props) => {
  return (
    <View style={styles.container}>
      <>
        <CalendarIcon
          width={rem(14)}
          height={rem(14)}
          color={COLORS.secondary}
        />
        <Text style={styles.dateText}>
          {dayjs(time).format('MMM DD, YYYY')}
        </Text>
      </>
      <View style={styles.spacer} />
      <>
        <StarIcon color={COLORS.secondary} width={rem(12)} height={rem(12)} />
        <Text style={styles.diffPercText}>
          {balanceDiff.bonus > 0 && '+'}
          {balanceDiff.bonus}%
        </Text>
      </>
      <View style={commonStyles.flexOne} />
      <View style={styles.amountContainer}>
        {!isRTL && (
          <Text style={styles.diffNumText}>
            {balanceDiff.negative ? '-' : '+'}
          </Text>
        )}
        <FormattedNumber
          number={formatNumberString(balanceDiff.amount)}
          bodyStyle={styles.amountValueText}
          decimalsStyle={styles.amountDecimalsText}
          trim
        />
        {isRTL && (
          <Text style={styles.diffNumText}>
            {balanceDiff.negative ? '-' : '+'}
          </Text>
        )}
        <IceLabel
          color={COLORS.secondary}
          textStyle={styles.amountValueText}
          iconSize={13}
          iconOffsetY={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: rem(6),
    height: rem(44),
    paddingHorizontal: rem(16),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  dateText: {
    ...font(12, 18, 'medium', 'secondary'),
    marginLeft: rem(4),
  },
  diffPercText: {
    ...font(13, 18, 'bold', 'secondary'),
    marginLeft: rem(5),
  },
  diffNumText: {
    ...font(13, 18, 'bold', 'secondary'),
    marginRight: !isRTL ? 0 : rem(4),
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountValueText: {
    ...font(13, 18, 'bold', 'secondary'),
  },
  amountDecimalsText: {
    ...font(8, 12, 'bold', 'secondary'),
    marginRight: isRTL ? 0 : rem(4),
  },
  spacer: {flex: isRTL ? 5 : 3},
});
