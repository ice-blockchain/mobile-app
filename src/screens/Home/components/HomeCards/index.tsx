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
    inputRange: [0, 230],
    outputRange: [rem(224), rem(37)],
    extrapolate: 'clamp',
  });
  const opacityOutInterpolation = scrolling.interpolate({
    inputRange: [100, 120],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const scaleInterpolation = scrolling.interpolate({
    inputRange: [0, 230],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });
  const translateYInterpolation = scrolling.interpolate({
    inputRange: [0, 230],
    outputRange: [0, 0],
    extrapolate: 'clamp',
  });

  const opacityInInterpolation = scrolling.interpolate({
    inputRange: [0, 230],
    outputRange: [0, 1],
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
