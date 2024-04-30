// SPDX-License-Identifier: ice License 1.0

import {IceLabel} from '@components/Labels/IceLabel';
import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {isLiteTeam} from '@constants/featureFlags';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {InviteShareCard} from '@screens/InviteFlow/InviteShare/components/InviteShareCard';
import {isRTL, replaceString, t, tagRegex} from '@translations/i18n';
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
        <LinesBackground style={styles.background} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {replaceString(
              isLiteTeam
                ? t('override.profile.invite_friends_engage')
                : t('invite_share.description'),
              tagRegex('ice'),
              (match, index) => (
                <IceLabel key={match + index} iconOffsetY={isAndroid ? 3 : 2} />
              ),
            )}
          </Text>
        </View>
        <Image source={icon} style={styles.icon} resizeMode={'contain'} />
        <InviteShareCard />
      </View>
    </View>
  );
});

const CONTAINER_TOP_RADIUS = rem(30);

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: CONTAINER_TOP_RADIUS,
    borderTopRightRadius: CONTAINER_TOP_RADIUS,
  },
  descriptionContainer: {
    marginTop: rem(45),
    marginHorizontal: rem(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    ...font(15, null, 'regular', 'white', 'center'),
  },
  icon: {
    marginVertical: rem(16),
    marginLeft: isRTL ? 0 : rem(21),
    marginRight: !isRTL ? 0 : rem(21),
    flex: 1,
    /**
     * need to allow the image to be stretched to the full width of the screen
     */
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
