// SPDX-License-Identifier: BUSL-1.1

import {InviteButton} from '@components/InviteButton';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

export const Invite = memo(() => (
  <View style={styles.container}>
    <InviteButton />
    <Text style={styles.text}>{t('profile.invite_friends_engage')}</Text>
  </View>
));

const styles = StyleSheet.create({
  text: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(28),
    fontSize: font(14),
    lineHeight: font(20),
    fontFamily: FONTS.primary.regular,
    color: COLORS.darkBlue,
    textAlign: 'center',
  },
  container: {
    marginTop: rem(38),
  },
});
