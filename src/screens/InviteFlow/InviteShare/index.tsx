// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import ShareCard from '@screens/InviteFlow/InviteShare/components/ShareCard';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {font, rem, screenWidth} from 'rn-units';

const icon = require('./assets/images/share.png');

export const InviteShare = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const {shadowStyle} = useScrollShadow();

  return (
    <View style={styles.container}>
      <Header containerStyle={shadowStyle} color={COLORS.white} />
      <Text style={styles.title}>{t('invite_share.title')}</Text>
      <Text style={styles.description}>{t('invite_share.description')}</Text>
      <Image source={icon} style={styles.icon} />
      <ShareCard />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  title: {
    fontFamily: FONTS.primary.black,
    fontSize: font(24),
    color: COLORS.white,
    textAlign: 'center',
  },
  description: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(15),
    color: COLORS.white,
    textAlign: 'center',
    marginTop: rem(14),
  },
  icon: {
    marginLeft: rem(15),
    width: screenWidth,
    height: screenWidth * 0.88,
    marginTop: rem(22),
  },
});
