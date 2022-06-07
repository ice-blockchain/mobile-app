// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {Animated, ScrollView, StyleSheet} from 'react-native';
import {rem} from 'rn-units';

import {AdoptionCard} from './AdoptionCard';
import {LevelCard} from './LevelCard';
import {RefferalsCard} from './RefferalsCard';
import {WalletCard} from './WalletCard';

interface HomeCardsProps {
  scrolling: Animated.Value;
}

export const HomeCards = ({scrolling}: HomeCardsProps) => {
  const heightInterpolation = scrolling.interpolate({
    inputRange: [0, 1],
    outputRange: [rem(37), rem(224)],
    extrapolate: 'clamp',
  });
  const opacityOutInterpolation = scrolling.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const scaleInterpolation = scrolling.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
    extrapolate: 'clamp',
  });
  const translateYInterpolation = scrolling.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 0],
    extrapolate: 'clamp',
  });

  const translateXInterpolation = scrolling.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 45],
    extrapolate: 'clamp',
  });

  const opacityInInterpolation = scrolling.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <WalletCard
        heightInterpolation={heightInterpolation}
        opacityOutInterpolation={opacityOutInterpolation}
        scaleInterpolation={scaleInterpolation}
        translateYInterpolation={translateYInterpolation}
        translateXInterpolation={translateXInterpolation}
        opacityInInterpolation={opacityInInterpolation}
      />
      <LevelCard
        heightInterpolation={heightInterpolation}
        opacityOutInterpolation={opacityOutInterpolation}
        scaleInterpolation={scaleInterpolation}
        translateYInterpolation={translateYInterpolation}
      />
      <RefferalsCard
        heightInterpolation={heightInterpolation}
        opacityOutInterpolation={opacityOutInterpolation}
        scaleInterpolation={scaleInterpolation}
        translateYInterpolation={translateYInterpolation}
      />
      <AdoptionCard
        heightInterpolation={heightInterpolation}
        opacityOutInterpolation={opacityOutInterpolation}
        scaleInterpolation={scaleInterpolation}
        translateYInterpolation={translateYInterpolation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    position: 'absolute',
    top: 0,
  },
  content: {
    paddingHorizontal: rem(15),
  },
});
