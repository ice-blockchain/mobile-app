// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {numberWithCommas} from '@utils/number';
import React from 'react';
import {
  FlexStyle,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {font, rem} from 'rn-units';

interface TopMinersItemProps {
  nickname: string;
  miners: string | number;
  topBorder?: boolean;
  photo?: ImageSourcePropType;
  bottomBorder?: boolean;
  style?: StyleProp<ViewStyle | FlexStyle>;
}

export const TopMinersItem = ({
  nickname,
  miners,
  topBorder,
  bottomBorder,
  style,
  photo,
}: TopMinersItemProps) => {
  return (
    <View
      style={[
        styles.user,
        topBorder && styles.topBorder,
        bottomBorder && styles.bottomBorder,
        style,
      ]}>
      <View style={styles.userInfo}>
        {photo ? (
          <Image source={photo} style={styles.icon} resizeMode="cover" />
        ) : (
          <View style={styles.icon} />
        )}
        <Text style={styles.nickname}>{nickname}</Text>
      </View>
      <Text style={styles.ice}>{`${numberWithCommas(miners)} ice`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    paddingHorizontal: rem(24),
    alignItems: 'center',
    paddingVertical: rem(13),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.linkWater,
    backgroundColor: COLORS.white,
  },
  icon: {
    width: rem(29),
    height: rem(29),
    borderRadius: 9,
    backgroundColor: COLORS.gullGray,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontSize: font(12),
    color: COLORS.darkBlue,
    fontFamily: FONTS.primary.bold,
    marginLeft: rem(8),
  },
  ice: {
    fontSize: font(12),
    color: COLORS.greyText,
    fontFamily: FONTS.primary.semibold,
  },
  topBorder: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomBorder: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
