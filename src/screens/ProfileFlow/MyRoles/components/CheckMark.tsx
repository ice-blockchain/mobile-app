// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {CheckMarkIcon} from '@svg/CheckMarkIcon';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const CheckMark = ({style}: Props = {}) => {
  return (
    <View style={[styles.container, style]}>
      <CheckMarkIcon fill={COLORS.white} width={rem(16)} height={rem(16)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(26),
    height: rem(26),
    borderRadius: rem(26) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkBlue,
  },
});
