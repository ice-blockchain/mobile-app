// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {InviteIcon} from '@svg/InviteIcon';
import {StarTransparentIcon} from '@svg/StarTransparentIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const InviteButton = ({style}: Props = {}) => {
  return (
    <TouchableOpacity style={[styles.button, commonStyles.shadow, style]}>
      <View style={styles.iconWrapper}>
        <InviteIcon style={styles.icon} />
      </View>
      <View style={styles.body}>
        <Text style={styles.mainText}>{t('button.invite_friend.title')}</Text>
        <Text style={styles.noteText}>
          {t('button.invite_friend.description')}
        </Text>
      </View>
      <StarTransparentIcon style={styles.backgroundIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_SIDE_OFFSET,
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
