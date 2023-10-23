// SPDX-License-Identifier: ice License 1.0

import {InviteButton} from '@components/Buttons/InviteButton';
import {Touchable} from '@components/Touchable';
import {isLiteTeam} from '@constants/featureFlags';
import {LINKS} from '@constants/links';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BorderedInfoIcon} from '@svg/BorderedInfoIcon';
import {isRTL, t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {isAndroid, rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Invite = memo(({style}: Props) => (
  <View style={[styles.container, style]}>
    <InviteButton />
    <Text style={styles.text}>
      {isLiteTeam
        ? t('override.profile.invite_friends_engage')
        : t('profile.invite_friends_engage')}
      <Touchable
        style={styles.infoButton}
        onPress={() =>
          openLinkWithInAppBrowser({
            url: LINKS.TEAM,
          })
        }>
        {isLiteTeam ? null : <BorderedInfoIcon />}
      </Touchable>
    </Text>
  </View>
));

const styles = StyleSheet.create({
  text: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(32),
    ...font(
      14,
      20,
      'regular',
      'primaryDark',
      isRTL && isAndroid ? 'left' : 'center', // info icon doesn't align center on Android
    ),
  },
  container: {
    marginTop: rem(15),
    marginBottom: rem(10),
  },
  infoButton: {
    paddingLeft: rem(5),
    alignSelf: 'flex-end',
  },
});
