// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {Header, HEADER_HEIGHT} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {useTopOffsetStyle} from '@navigation/hooks/useTopOffsetStyle';
import ShareCard from '@screens/InviteFlow/InviteShare/components/ShareCard';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem, screenHeight, screenWidth} from 'rn-units';

const icon = require('./assets/images/share.png');

const ICON_LEFT_OFFSET = rem(21);
const ICON_WIDTH = screenWidth - ICON_LEFT_OFFSET;

export const InviteShare = memo(() => {
  useFocusStatusBar({style: 'dark-content'});

  const {
    current: {paddingTop},
  } = useTopOffsetStyle();

  const top = HEADER_HEIGHT + paddingTop + rem(12);

  return (
    <View style={styles.container}>
      <Header color={COLORS.primaryDark} title={t('invite_share.title')} />
      <View style={styles.shareSubstrate} />
      <Image
        style={[styles.bg, {top}]}
        source={Images.backgrounds.linesBg}
        resizeMode="stretch"
      />
      <Text style={styles.description}>
        {t('invite_share.description_part1')}
        <IceLabel iconOffsetY={isAndroid ? 3 : 2} />
        {t('invite_share.description_part2')}
      </Text>
      <Image source={icon} style={styles.icon} />
      <ShareCard />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  bg: {
    position: 'absolute',
    left: 0,
    height: screenWidth * 1.266,
    width: screenWidth,
    borderTopLeftRadius: rem(30),
    borderTopRightRadius: rem(30),
  },
  description: {
    textAlign: 'center',
    ...font(15, null, 'regular', 'white'),
    marginTop: rem(45),
    marginHorizontal: rem(28),
  },
  icon: {
    marginLeft: ICON_LEFT_OFFSET,
    width: ICON_WIDTH,
    height: ICON_WIDTH * 0.858,
    marginTop: rem(17),
  },
  shareSubstrate: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight / 2,
    backgroundColor: COLORS.primaryLight,
  },
});
