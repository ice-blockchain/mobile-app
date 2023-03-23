// SPDX-License-Identifier: ice License 1.0

import {InviteButton} from '@components/InviteButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const Invite = memo(() => (
  <View style={styles.container}>
    <InviteButton />
    <Text style={styles.text}>{t('profile.invite_friends_engage')}</Text>
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
});
