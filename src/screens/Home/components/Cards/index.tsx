// SPDX-License-Identifier: BUSL-1.1

import React from 'react';
import {Animated, ScrollView, StyleSheet} from 'react-native';
import {rem} from 'rn-units';

import {AdoptionCard} from './components/AdoptionCard';
import {LevelCard} from './components/LevelCard';
import {RefferalsCard} from './components/RefferalsCard';
import {WalletCard} from './components/WalletCard';

interface HomeCardsProps {
  scrolling: Animated.Value;
}
export const collapsedCardHeight = rem(37);
const cardHeight = rem(224);
export const scrollInterpolationTopPosition = rem(187);

export const Cards = ({scrolling}: HomeCardsProps) => {
  const heightInterpolation = scrolling.interpolate({
    inputRange: [0, scrollInterpolationTopPosition],
    outputRange: [cardHeight, collapsedCardHeight],
    extrapolate: 'clamp',
  });
  const opacityOutInterpolation = scrolling.interpolate({
    inputRange: [100, 120],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const scaleInterpolation = scrolling.interpolate({
    inputRange: [0, scrollInterpolationTopPosition],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  const opacityInInterpolation = scrolling.interpolate({
    inputRange: [0, scrollInterpolationTopPosition],
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
        opacityInInterpolation={opacityInInterpolation}
      />
      <LevelCard
        heightInterpolation={heightInterpolation}
        opacityOutInterpolation={opacityOutInterpolation}
        scaleInterpolation={scaleInterpolation}
      />
      <RefferalsCard
        heightInterpolation={heightInterpolation}
        opacityOutInterpolation={opacityOutInterpolation}
        scaleInterpolation={scaleInterpolation}
      />
      <AdoptionCard
        heightInterpolation={heightInterpolation}
        opacityOutInterpolation={opacityOutInterpolation}
        scaleInterpolation={scaleInterpolation}
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
