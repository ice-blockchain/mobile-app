// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {AdoptionCardSvg} from '@svg/AdoptionCard';
import {AutoGraphSvg} from '@svg/AutoGraph';
import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

interface AdoptionCardProps {
  heightInterpolation: Animated.AnimatedInterpolation;
  opacityOutInterpolation: Animated.AnimatedInterpolation;
  scaleInterpolation: Animated.AnimatedInterpolation;
  translateYInterpolation: Animated.AnimatedInterpolation;
}

export const AdoptionCard = ({
  heightInterpolation,
  opacityOutInterpolation,
  scaleInterpolation,
  translateYInterpolation,
}: AdoptionCardProps) => {
  return (
    <Animated.View style={[styles.container, {height: heightInterpolation}]}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: opacityOutInterpolation,
            transform: [
              {scaleY: scaleInterpolation},
              {scaleX: scaleInterpolation},
              {translateY: translateYInterpolation},
            ],
          },
        ]}>
        <AdoptionCardSvg width={rem(175)} />
      </Animated.View>
      <View style={styles.header}>
        <View style={styles.row}>
          <AutoGraphSvg />
          <Text style={styles.headerText}>{'ADOPTION'}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(175),
    backgroundColor: '#29B098',
    marginHorizontal: rem(8),
    borderRadius: 13,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: rem(14),
    paddingHorizontal: rem(13),
    justifyContent: 'space-between',
    position: 'absolute',
  },
  headerText: {
    fontSize: font(12),
    lineHeight: rem(14),
    color: COLORS.white,
    fontFamily: FONTS.primary.black,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: font(10),
    lineHeight: rem(12),
    color: COLORS.white,
    fontFamily: FONTS.primary.bold,
  },
});
