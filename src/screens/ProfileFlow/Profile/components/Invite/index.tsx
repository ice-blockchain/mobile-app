// SPDX-License-Identifier: ice License 1.0

import {InviteButton} from '@components/InviteButton';
import {Touchable} from '@components/Touchable';
import {LINKS} from '@constants/links';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {BorderedInfoIcon} from '@svg/BorderedInfoIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Invite = memo(({style}: Props) => (
  <View style={[styles.container, style]}>
    <InviteButton />
    <Text style={styles.text}>
      {t('profile.invite_friends_engage')}
      <Touchable
        style={styles.infoButton}
        onPress={() =>
          openLinkWithInAppBrowser({
            url: LINKS.TEAM,
          })
        }>
        <BorderedInfoIcon />
      </Touchable>
    </Text>
  </View>
));

const styles = StyleSheet.create({
  text: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(32),
    ...font(14, 20, 'regular', 'primaryDark'),
    textAlign: 'center',
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
