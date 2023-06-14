// SPDX-License-Identifier: ice License 1.0

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {commonStyles} from '@constants/styles';
import {AnimatedNumberText} from '@hooks/AnimatedNumber';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {formatNumberString, parseNumber} from '@utils/numbers';
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
      const formattedValue = formatNumberString(String(animatedValue));
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

  return (
    <AnimatedNumberText
      value={parseNumber(balanceSummary?.total ?? '0')}
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
