// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {AdoptionCardSvg} from '@svg/AdoptionCard';
import {AdoptionCardBackSvg} from '@svg/AdoptionCardBack';
import {AutoGraphSvg} from '@svg/AutoGraph';
import {UsersSvg} from '@svg/Users';
import {translate} from '@translations/i18n';
import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

interface AdoptionCardProps {
  heightInterpolation: Animated.AnimatedInterpolation;
  opacityOutInterpolation: Animated.AnimatedInterpolation;
  scaleInterpolation: Animated.AnimatedInterpolation;
}

export const AdoptionCard = ({
  heightInterpolation,
  opacityOutInterpolation,
  scaleInterpolation,
}: AdoptionCardProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const cardPosition = useRef<'front' | 'back'>('front');
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });
  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  const onCardPress = () => {
    Animated.spring(animatedValue, {
      toValue: cardPosition.current === 'front' ? 1 : 0,
      friction: 8,
      tension: 15,
      velocity: 5,
      useNativeDriver: true,
    }).start();
    cardPosition.current = cardPosition.current === 'front' ? 'back' : 'front';
  };

  return (
    <Animated.View style={[styles.container, {height: heightInterpolation}]}>
      <TouchableOpacity
        onPress={onCardPress}
        style={styles.button}
        activeOpacity={1}>
        <Animated.View style={[styles.frontView, frontAnimatedStyle]}>
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
            <AdoptionCardSvg width={rem(175)} />
          </Animated.View>
          <View style={styles.header}>
            <View style={styles.row}>
              <AutoGraphSvg />
              <Text style={styles.headerText}>
                {translate('home.adoption.title')}
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.backView, backAnimatedStyle]}>
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
            <AdoptionCardBackSvg />
          </Animated.View>
          <View style={styles.header}>
            <View style={styles.row}>
              <AutoGraphSvg />
              <Text style={styles.headerText}>
                {translate('home.adoption.title')}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.headerText}>{'54,233 '}</Text>
              <UsersSvg />
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(175),
    marginHorizontal: rem(8),
    borderRadius: 13,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: rem(12),
    paddingHorizontal: rem(13),
    justifyContent: 'space-between',
    position: 'absolute',
    right: 0,
    left: 0,
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
  frontView: {
    flex: 1,
    backfaceVisibility: 'hidden',
    backgroundColor: '#29B098',
    borderRadius: 13,
  },
  backView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backfaceVisibility: 'hidden',
    borderRadius: 13,
    backgroundColor: '#29B098',
  },
  button: {
    flex: 1,
  },
});
