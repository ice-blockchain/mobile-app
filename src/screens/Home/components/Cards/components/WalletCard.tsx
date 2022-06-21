// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {InfoSvg} from '@svg/Info';
import {LogoIconSvg} from '@svg/LogoIcon';
import {WalletSvg} from '@svg/Wallet';
import {translate} from '@translations/i18n';
import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

interface WalletCardProps {
  heightInterpolation: Animated.AnimatedInterpolation;
  opacityOutInterpolation: Animated.AnimatedInterpolation;
  scaleInterpolation: Animated.AnimatedInterpolation;
  opacityInInterpolation: Animated.AnimatedInterpolation;
}

export const WalletCard = ({
  heightInterpolation,
  opacityOutInterpolation,
  scaleInterpolation,
  opacityInInterpolation,
}: WalletCardProps) => {
  return (
    <Animated.View style={[styles.container, {height: heightInterpolation}]}>
      <View style={styles.header}>
        <View style={styles.row}>
          <WalletSvg />
          <Text style={styles.headerText}>
            {translate('home.wallet.title')}
          </Text>
        </View>

        <Animated.View
          style={{
            opacity: opacityInInterpolation,
          }}>
          <InfoSvg width={16} height={16} />
        </Animated.View>
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
        <LogoIconSvg color={COLORS.white} width={rem(69)} height={rem(69)} />
        <Text style={styles.balance}>{'20,249,999.99 ice'}</Text>

        <View style={styles.row}>
          <Text style={[styles.text, styles.textCurrentBalance]}>
            {translate('home.wallet.balance')}
          </Text>
          <InfoSvg />
        </View>

        <View style={styles.devider} />

        <Text style={styles.text}>{translate('home.wallet.rate')}</Text>
        <Text style={styles.iceHr}>{'+29.99 ice/hr'}</Text>
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
    paddingHorizontal: rem(11),
    paddingVertical: rem(12),
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: FONTS.primary.bold,
    color: COLORS.white,
    textTransform: 'uppercase',
    marginLeft: 4,
    fontSize: font(12),
  },
  content: {
    alignItems: 'center',
    marginTop: rem(5),
  },
  balance: {
    fontFamily: FONTS.primary.bold,
    color: COLORS.white,
    fontSize: font(18),
    lineHeight: rem(24),
    marginVertical: rem(4),
  },
  text: {
    fontFamily: FONTS.primary.bold,
    color: COLORS.white,
    marginLeft: 4,
    fontSize: font(10),
    lineHeight: rem(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCurrentBalance: {
    marginRight: 4,
  },
  devider: {
    width: rem(21),
    height: 1,
    backgroundColor: COLORS.white,
    marginVertical: rem(12),
  },
  iceHr: {
    marginTop: 2,
    color: COLORS.shamrock,
    fontSize: font(15),
    lineHeight: rem(18),
    fontFamily: FONTS.primary.bold,
  },
});
