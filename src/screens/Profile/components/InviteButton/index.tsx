// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {InviteIcon} from '@svg/InviteIcon';
import {StarTransparentIcon} from '@svg/StarTransparentIcon';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

export const InviteButton = () => {
  return (
    <TouchableOpacity style={[styles.container, commonStyles.shadow]}>
      <View style={styles.iconWrapper}>
        <InviteIcon style={styles.icon} />
      </View>
      <View style={styles.body}>
        <Text style={styles.mainText}>Invite Friends</Text>
        <Text style={styles.noteText}>
          Earn extra ice by inviting your friends.
        </Text>
      </View>
      <StarTransparentIcon style={styles.backgroundIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(38),
    height: rem(64),
    borderRadius: rem(15),
    alignItems: 'center',
    backgroundColor: COLORS.persianBlue,
  },
  iconWrapper: {
    width: rem(36),
    height: rem(36),
    borderRadius: rem(12),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: rem(14),
  },
  icon: {
    width: rem(21),
    height: rem(20),
  },
  body: {
    marginLeft: rem(10),
  },
  mainText: {
    fontSize: font(15),
    lineHeight: font(18),
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
  },
  noteText: {
    fontSize: font(12),
    lineHeight: font(15),
    fontFamily: FONTS.primary.regular,
    color: COLORS.white,
  },
  backgroundIcon: {
    position: 'absolute',
    right: -rem(3),
    top: -rem(5),
    width: rem(52),
    height: rem(52),
  },
});
