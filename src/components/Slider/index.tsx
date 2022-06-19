// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  AwesomeSliderProps,
  Slider as AwesomeSlider,
} from 'react-native-awesome-slider';
import {rem} from 'rn-units';

const noop = () => null;

const theme = {
  minimumTrackTintColor: COLORS.shamrock,
  maximumTrackTintColor: COLORS.linkWater,
};

export const Slider = (props: AwesomeSliderProps) => (
  <AwesomeSlider
    theme={theme}
    containerStyle={styles.track}
    renderThumb={() => <View style={styles.thumb} />}
    markStyle={styles.mark}
    renderBubble={noop}
    {...props}
  />
);

const styles = StyleSheet.create({
  thumb: {
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: COLORS.shamrock,
    width: rem(16),
    height: rem(16),
    borderRadius: rem(16 / 2),
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
  },
  track: {
    height: 6,
    borderRadius: 3,
  },
  mark: {
    width: 0,
  },
});
