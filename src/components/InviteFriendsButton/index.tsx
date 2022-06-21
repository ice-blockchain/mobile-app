// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {InviteFriendsSvg} from '@svg/InviteFriends';
import {LogoIconSvg} from '@svg/LogoIcon';
import {translate} from '@translations/i18n';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

interface InviteFriendsButtonProps {}

export const InviteFriendsButton = ({}: InviteFriendsButtonProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.logo}>
        <LogoIconSvg color={COLORS.white02opacity} width={52} height={52} />
      </View>

      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <InviteFriendsSvg />
        </View>

        <View>
          <Text style={styles.title}>
            {translate('button.invite_friend.title')}
          </Text>

          <Text style={styles.description}>
            {translate('button.invite_friend.description')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.persianBlue,
    borderRadius: 15,
    padding: rem(14),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: rem(10),
    backgroundColor: COLORS.white,
    borderRadius: rem(14),
    marginRight: rem(10),
  },
  title: {
    fontFamily: FONTS.primary.black,
    fontSize: font(15),
    lineHeight: rem(18),
    color: COLORS.white,
  },
  description: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(12),
    lineHeight: rem(14),
    color: COLORS.white,
  },
  logo: {
    position: 'absolute',
    right: 0,
  },
});
