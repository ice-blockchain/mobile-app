// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {Layout} from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  valuePercentage: number;
  style?: StyleProp<ViewStyle>;
};

export const ProgressBar = ({valuePercentage, style}: Props) => {
  return (
    <View style={[style, styles.container]}>
      <Animated.View
        style={[styles.value, {width: `${valuePercentage}%`}]}
        layout={Layout.springify()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: rem(5),
    borderRadius: rem(4),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
  },
  value: {
    backgroundColor: COLORS.shamrock,
    borderRadius: rem(4),
  },
});
