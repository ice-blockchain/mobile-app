// SPDX-License-Identifier: ice License 1.0

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {useAnimatedNumber} from '@hooks/useAnimatedNumber';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {formatNumberString, parseNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {useSelector} from 'react-redux';

interface Props {
  style?: StyleProp<TextStyle>;
}

export const TotalBalanceValue = ({style}: Props) => {
  const balanceSummary = useSelector(balanceSummarySelector);

  const animatedBalanceSummary = useAnimatedNumber(
    parseNumber(balanceSummary?.total ?? '0'),
    initialValue => formatNumberString(String(initialValue)),
  );

  return (
    <FormattedNumber
      containerStyle={style}
      number={animatedBalanceSummary}
      bodyStyle={styles.bodyStyle}
      decimalsStyle={styles.decimalsStyle}
      trim
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
