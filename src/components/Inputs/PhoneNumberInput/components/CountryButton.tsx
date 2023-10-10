// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {ChevronSmallIcon} from '@svg/ChevronSmallIcon';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  flag: string;
  onPress: () => void;
};

export const CountryButton = ({flag, onPress}: Props) => {
  return (
    <Touchable style={styles.container} onPress={onPress}>
      <Text style={styles.flag}>{flag}</Text>
      <ChevronSmallIcon
        color={COLORS.gunmetalGrey}
        width={rem(12)}
        height={rem(12)}
      />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: rem(16),
    marginVertical: rem(4),
    marginHorizontal: rem(4),
    width: rem(74),
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    fontSize: rem(28),
    marginRight: rem(4),
  },
});
