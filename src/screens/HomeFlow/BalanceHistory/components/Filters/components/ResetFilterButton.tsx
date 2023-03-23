// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {CloseIcon} from '@svg/CloseIcon';
import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  onPress: () => void;
};

export const ResetFilterButton = ({onPress}: Props) => (
  <Touchable
    onPress={onPress}
    style={styles.container}
    hitSlop={SMALL_BUTTON_HIT_SLOP}>
    <CloseIcon color={COLORS.white} width={rem(8)} height={rem(8)} />
  </Touchable>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: rem(10),
    paddingLeft: rem(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
