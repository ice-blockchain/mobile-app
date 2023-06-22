// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {COLORS} from '@constants/colors';
import {miningRatesSelector} from '@store/modules/Tokenomics/selectors';
import {formatNumber} from '@utils/numbers';
import React, {useCallback, useMemo} from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {useSelector} from 'react-redux';

interface Props {
  style?: StyleProp<TextStyle>;
}

export const TotalMiningRateValue = ({style}: Props) => {
  const miningRates = useSelector(miningRatesSelector);

  const rateValueTextStyle = useMemo(() => {
    switch (miningRates?.type) {
      case 'positive':
        return styles.positive;

      case 'negative':
        return styles.negative;

      default:
        return styles.neutral;
    }
  }, [miningRates?.type]);

  const NumberComponent = useCallback(
    ({animatedValue}) => {
      const formattedValue = `${animatedValue > 0 ? '+' : ''}${formatNumber(
        animatedValue,
        {minimumFractionDigits: 2, maximumFractionDigits: 2},
      )}`;
      return (
        <FormattedNumber
          containerStyle={style}
          bodyStyle={rateValueTextStyle}
          decimalsStyle={rateValueTextStyle}
          number={formattedValue}
          trim
        />
      );
    },
    [rateValueTextStyle, style],
  );

  if (!miningRates) {
    return null;
  }

  return (
    <AnimatedNumberText
      value={
        miningRates.total.amount *
        {
          positive: 1,
          negative: -1,
          none: 1,
        }[miningRates.type]
      }
      NumberComponent={NumberComponent}
    />
  );
};

const styles = StyleSheet.create({
  positive: {
    color: COLORS.shamrock,
  },

  negative: {
    color: COLORS.attention,
  },

  neutral: {
    color: COLORS.white,
  },
});
