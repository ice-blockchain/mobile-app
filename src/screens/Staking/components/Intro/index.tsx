// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {LogoIconSvg} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

export const Intro = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <LogoIconSvg color={COLORS.white} width={rem(26)} height={rem(26)} />
        <Text style={styles.titleText}>{t('staking.title')}</Text>
      </View>
      <Text style={styles.noteText}>{t('staking.benefits_description')}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(18),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: font(24),
    lineHeight: font(29),
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
    marginLeft: rem(6),
    marginTop: rem(2),
  },
  noteText: {
    fontSize: font(14),
    lineHeight: font(20),
    fontFamily: FONTS.primary.regular,
    color: COLORS.linkWater,
    marginTop: rem(12),
  },
});
