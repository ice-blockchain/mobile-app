// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleSheet} from 'react-native';
import RNSlider, {SliderProps} from 'react-native-slider';
import {rem} from 'rn-units';

export const Slider = (props: Omit<SliderProps, 'disabled'>) => (
  <RNSlider
    minimumTrackTintColor={COLORS.shamrock}
    maximumTrackTintColor={COLORS.linkWater}
    thumbStyle={styles.sliderThumb}
    trackStyle={styles.sliderTrack}
    disabled={false}
    {...props}
  />
);

const styles = StyleSheet.create({
  sliderThumb: {
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: COLORS.shamrock,
    width: rem(16),
    height: rem(16),
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
  },
});
