// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles, windowWidth} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import ShareCard from '@screens/InviteFlow/InviteShare/components/ShareCard';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem, screenHeight} from 'rn-units';

const icon = require('./assets/images/share.png');

const ICON_LEFT_OFFSET = rem(21);
const ICON_WIDTH = windowWidth - ICON_LEFT_OFFSET;

export const InviteShare = memo(() => {
  useFocusStatusBar({style: 'dark-content'});

  return (
    <View style={commonStyles.flexOne}>
      <Header color={COLORS.primaryDark} title={t('invite_share.title')} />
      <View style={commonStyles.flexOne}>
        <View style={styles.shareSubstrate} />
        <LinesBackground style={styles.bg} />
        <Text style={styles.description}>
          {replaceString(t('invite_share.description'), tagRegex('ice'), () => (
            <IceLabel iconOffsetY={isAndroid ? 3 : 2} />
          ))}
        </Text>
        <Image source={icon} style={styles.icon} />
        <ShareCard />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  bg: {
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
    right: 0,
    height: screenHeight / 2,
    backgroundColor: COLORS.primaryLight,
  },
});
