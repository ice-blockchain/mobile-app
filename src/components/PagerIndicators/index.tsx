// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import React, {memo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  activeIndex: number;
  total?: number;
  style?: StyleProp<ViewStyle>;
};

const INDICATOR_SIZE = rem(6);

export const PagerIndicators = memo(
  ({activeIndex, total = 2, style}: Props) => {
    return (
      <View style={[styles.container, style]}>
        {Array(total)
          .fill(null)
          .map((_, index) => (
            <View
              style={[
                styles.indicator,
                activeIndex === index && styles.activeIndicator,
              ]}
              key={`dot_${index}`}
            />
          ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    marginHorizontal: rem(3),
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2,
    backgroundColor: COLORS.white,
    opacity: 0.5,
  },
  activeIndicator: {
    opacity: 1,
  },
});
