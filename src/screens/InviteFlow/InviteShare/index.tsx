// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {InviteShareCard} from '@screens/InviteFlow/InviteShare/components/InviteShareCard';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem, screenHeight} from 'rn-units';

const icon = require('./assets/images/share.png');

export const InviteShare = memo(() => {
  useFocusStatusBar({style: 'dark-content'});

  return (
    <View style={commonStyles.flexOne}>
      <Header color={COLORS.primaryDark} title={t('invite_share.title')} />
      <View style={commonStyles.flexOne}>
        <View style={styles.shareSubstrate} />
        <LinesBackground style={styles.bg} />
        <Text style={styles.description}>
          {replaceString(
            t('invite_share.description'),
            tagRegex('ice'),
            (match, index) => (
              <IceLabel key={match + index} iconOffsetY={isAndroid ? 3 : 2} />
            ),
          )}
        </Text>
        <Image source={icon} style={styles.icon} resizeMode={'contain'} />
        <InviteShareCard />
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
    marginTop: rem(45),
    marginHorizontal: rem(28),
    ...font(15, null, 'regular', 'white', 'center'),
  },
  icon: {
    marginVertical: rem(16),
    marginStart: rem(21),
    flex: 1,
    width: undefined,
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
