// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  AwesomeSliderProps,
  Slider as AwesomeSlider,
} from 'react-native-awesome-slider';
import {isIOS, rem} from 'rn-units';

const noop = () => null;

const theme = {
  minimumTrackTintColor: COLORS.shamrock,
  maximumTrackTintColor: COLORS.secondaryFaint,
};

const SLIDER_HEIGHT = rem(6);

export const Slider = (props: AwesomeSliderProps) => (
  <View style={styles.container}>
    <View style={[styles.track, styles.backdrop]} />
    <AwesomeSlider
      theme={theme}
      thumbWidth={0}
      markWidth={0}
      containerStyle={styles.track}
      renderThumb={() => <View style={styles.thumb} />}
      markStyle={styles.mark}
      renderBubble={noop}
      sliderHeight={SLIDER_HEIGHT}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: isIOS ? rem(10) : 0,
  },
  thumb: {
    backgroundColor: COLORS.shamrock,
    borderWidth: 2,
    borderColor: COLORS.white,
    width: rem(28),
    height: rem(28),
    marginLeft: -rem(28) / 2,
    borderRadius: rem(28) / 2,
  },
  track: {
    height: SLIDER_HEIGHT,
    borderRadius: SLIDER_HEIGHT / 2,
    paddingRight: rem(16),
  },
  backdrop: {
    backgroundColor: COLORS.secondary,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  mark: {
    width: 0,
  },
});
