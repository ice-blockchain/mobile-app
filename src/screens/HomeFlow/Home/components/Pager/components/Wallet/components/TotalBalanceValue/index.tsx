// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {commonStyles} from '@constants/styles';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {useCallback} from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {useSelector} from 'react-redux';

interface Props {
  style?: StyleProp<TextStyle>;
  darkMode?: boolean;
}

export const TotalBalanceValue = ({style, darkMode}: Props) => {
  const balanceSummary = useSelector(balanceSummarySelector);

  const NumberComponent = useCallback(
    ({animatedValue}) => {
      const formattedValue = formatNumber(animatedValue, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return (
        <FormattedNumber
          containerStyle={style}
          number={formattedValue}
          bodyStyle={[styles.bodyStyle, darkMode && commonStyles.darkText]}
          decimalsStyle={[
            styles.decimalsStyle,
            darkMode && commonStyles.darkText,
          ]}
          trim
        />
      );
    },
    [darkMode, style],
  );

  if (!balanceSummary) {
    return null;
  }

  return (
    <AnimatedNumberText
      value={balanceSummary.total}
      NumberComponent={NumberComponent}
    />
  );
};

const styles = StyleSheet.create({
  bodyStyle: {
    ...font(32, 38.4, 'black'),
  },

  decimalsStyle: {
    alignSelf: 'flex-start',
    ...font(15, 20, 'semibold'),
  },
});
