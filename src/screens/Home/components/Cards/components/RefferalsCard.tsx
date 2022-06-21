// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {RefferalsWhiteLineSvg} from '@svg/RefferalsWhiteLine';
import {TrophySvg} from '@svg/Trophy';
import {translate} from '@translations/i18n';
import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

interface RefferalsCardProps {
  heightInterpolation: Animated.AnimatedInterpolation;
  opacityOutInterpolation: Animated.AnimatedInterpolation;
  scaleInterpolation: Animated.AnimatedInterpolation;
}

export const RefferalsCard = ({
  heightInterpolation,
  opacityOutInterpolation,
  scaleInterpolation,
}: RefferalsCardProps) => {
  return (
    <Animated.View style={[styles.container, {height: heightInterpolation}]}>
      <View style={styles.header}>
        <TrophySvg />
        <Text style={styles.headerText}>
          {translate('home.referrals.title')}
        </Text>
      </View>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: opacityOutInterpolation,
            transform: [
              {scaleY: scaleInterpolation},
              {scaleX: scaleInterpolation},
            ],
          },
        ]}>
        <View style={styles.chart}>
          <RefferalsWhiteLineSvg width={rem(175 - 28)} />
        </View>
        <Text style={styles.text}>
          {translate('home.referrals.description')}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(175),
    backgroundColor: COLORS.downriver,
    marginHorizontal: rem(8),
    borderRadius: 13,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: rem(12),
    paddingHorizontal: rem(13),
  },
  headerText: {
    fontSize: font(12),
    lineHeight: rem(14),
    color: COLORS.white,
    fontFamily: FONTS.primary.black,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingBottom: rem(17),
  },
  text: {
    fontSize: font(11),
    lineHeight: rem(13),
    color: COLORS.white,
    fontFamily: FONTS.primary.regular,
    paddingHorizontal: rem(14),
    textAlign: 'center',
    marginTop: rem(30),
  },
  chart: {
    alignItems: 'center',
    marginTop: rem(35),
    marginBottom: rem(15),
    justifyContent: 'center',
  },
});
