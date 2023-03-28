// SPDX-License-Identifier: ice License 1.0

import {InviteButton} from '@components/InviteButton';
import {LINKS} from '@constants/links';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BorderedInfoIcon} from '@svg/BorderedInfoIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Invite = memo(({style}: Props) => (
  <View style={[styles.container, style]}>
    <InviteButton />
    <Text style={styles.text}>
      {t('profile.invite_friends_engage')}
      <Pressable
        style={styles.infoButton}
        onPress={() =>
          openLinkWithInAppBrowser({
            url: LINKS.TEAM,
          })
        }>
        <BorderedInfoIcon />
      </Pressable>
    </Text>
  </View>
));

const styles = StyleSheet.create({
  text: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(32),
    textAlign: 'center',
    ...font(14, 20, 'regular', 'primaryDark'),
  },
  container: {
    marginTop: rem(26),
    marginBottom: rem(10),
  },
  infoButton: {
    paddingLeft: 5,
    alignSelf: 'flex-end',
  },
});
