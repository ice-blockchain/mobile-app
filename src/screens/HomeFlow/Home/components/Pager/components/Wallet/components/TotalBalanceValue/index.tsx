// SPDX-License-Identifier: ice License 1.0

import {AnimatedNumberText} from '@components/AnimatedNumberText';
import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {commonStyles} from '@constants/styles';
import {useIsFocused} from '@react-navigation/native';
import {usePredictedBalanceUpdate} from '@screens/HomeFlow/Home/components/Pager/components/Wallet/components/TotalBalanceValue/hooks/usePredictedBalanceUpdate';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {useCallback, useMemo} from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';

interface Props {
  style?: StyleProp<TextStyle>;
  darkMode?: boolean;
}

const UPDATE_INTERVAL_MS = 1000;

export const TotalBalanceValue = ({style, darkMode}: Props) => {
  const {predictedBalance} = usePredictedBalanceUpdate({
    updateInterval: UPDATE_INTERVAL_MS,
  });

  const isScreenFocused = useIsFocused();

  const animationOptions = useMemo(
    () => ({duration: isScreenFocused ? UPDATE_INTERVAL_MS : 0}),
    [isScreenFocused],
  );

  const NumberComponent = useCallback(
    ({animatedValue}: {animatedValue: number}) => {
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

  if (predictedBalance == null) {
    return null;
  }

  return (
    <AnimatedNumberText
      value={predictedBalance}
      NumberComponent={NumberComponent}
      animationOptions={animationOptions}
    />
  );
};

const styles = StyleSheet.create({
  bodyStyle: {
    ...font(32, 40, 'black'),
  },

  decimalsStyle: {
    alignSelf: 'flex-start',
    ...font(15, 20, 'semibold'),
  },
});
