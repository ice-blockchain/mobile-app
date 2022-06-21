// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {ArrowUpRightCircleSvg} from '@svg/ArrowUpRightCircle';
import {PioneerSvg} from '@svg/Pioneer';
import {translate} from '@translations/i18n';
import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

interface LevelCardProps {
  heightInterpolation: Animated.AnimatedInterpolation;
  opacityOutInterpolation: Animated.AnimatedInterpolation;
  scaleInterpolation: Animated.AnimatedInterpolation;
}

export const LevelCard = ({
  heightInterpolation,
  opacityOutInterpolation,
  scaleInterpolation,
}: LevelCardProps) => {
  return (
    <Animated.View style={[styles.container, {height: heightInterpolation}]}>
      <View style={styles.header}>
        <View style={styles.level}>
          <PioneerSvg />
          <Text style={styles.levelName}>
            {translate('home.pioneer.title')}
          </Text>
        </View>

        <Text style={styles.levelText}>{'LEVEL 1'}</Text>
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
        <View style={styles.row}>
          <Text style={styles.globalRankAmount}>{'606,683'}</Text>
          <ArrowUpRightCircleSvg />
        </View>
        <Text style={styles.globalRankText}>
          {translate('home.pioneer.rank')}
        </Text>

        <Text style={styles.refferalsText}>
          {translate('home.pioneer.referrals')}
        </Text>
        <Text style={styles.refferalsAmount}>{'125'}</Text>
        <Text style={styles.refferalsDescription}>
          {translate('home.pioneer.description')}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dodgerBlue,
    width: rem(175),
    marginHorizontal: rem(8),
    borderRadius: 13,
    paddingTop: rem(8),
    paddingHorizontal: rem(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelName: {
    textTransform: 'uppercase',
    fontSize: rem(12),
    lineHeight: rem(14),
    fontFamily: FONTS.primary.bold,
    color: COLORS.darkBlue,
    marginLeft: 4,
  },
  level: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: rem(4),
    paddingHorizontal: rem(6),
    borderRadius: 4,
  },
  levelText: {
    fontSize: rem(12),
    lineHeight: rem(14),
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: rem(20),
  },
  globalRankAmount: {
    fontSize: rem(15),
    lineHeight: rem(18),
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
    marginRight: 3,
  },
  globalRankText: {
    fontSize: rem(10),
    lineHeight: rem(12),
    fontFamily: FONTS.primary.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    minHeight: 50,
  },
  refferalsText: {
    marginTop: rem(50),
    fontSize: rem(10),
    lineHeight: rem(12),
    fontFamily: FONTS.primary.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  refferalsAmount: {
    fontSize: rem(15),
    lineHeight: rem(18),
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: rem(14),
    marginTop: 2,
  },
  refferalsDescription: {
    fontSize: rem(11),
    lineHeight: rem(13),
    fontFamily: FONTS.primary.regular,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: rem(17),
  },
  centralEmptySpace: {
    flex: 1,
    minHeight: rem(30),
  },
});
