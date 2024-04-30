// SPDX-License-Identifier: ice License 1.0

import {Indicator} from '@svg/Indicator';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const SegmentIndicator = ({style}: Props) => {
  return (
    <Animated.View style={[styles.indicator, style]}>
      <Indicator width={'100%'} height={'100%'} preserveAspectRatio="none" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    borderRadius: rem(12),
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    marginVertical: rem(6),
  },
});
