// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {UserMultipleSvg} from '@svg/UserMultiple';
import {numberWithCommas} from '@utils/number';
import React from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {font, rem} from 'rn-units';

interface TopCountriesItemProps {
  icon: string;
  countryName: string;
  users: string | number;
  topBorder?: boolean;
  bottomBorder?: boolean;
  style?: StyleProp<ViewStyle | FlexStyle>;
}

export const TopCountriesItem = ({
  icon,
  countryName,
  users,
  topBorder,
  bottomBorder,
  style,
}: TopCountriesItemProps) => {
  return (
    <View
      style={[
        styles.user,
        topBorder && styles.topBorder,
        bottomBorder && styles.bottomBorder,
        style,
      ]}>
      <View style={styles.country}>
        <Text style={styles.countryIcon}>{icon}</Text>
        <Text style={styles.countryName}>{countryName}</Text>
      </View>

      <View style={styles.usersContainer}>
        <UserMultipleSvg />
        <Text style={styles.users}>{numberWithCommas(users)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    paddingHorizontal: rem(24),
    alignItems: 'center',
    paddingVertical: rem(10),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.linkWater,
    backgroundColor: COLORS.white,
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryIcon: {
    fontSize: font(30),
    lineHeight: rem(36),
  },
  countryName: {
    fontSize: font(12),
    color: COLORS.greyText,
    fontFamily: FONTS.primary.semibold,
    marginLeft: rem(8),
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  users: {
    fontSize: font(12),
    color: COLORS.greyText,
    fontFamily: FONTS.primary.bold,
    marginLeft: 6,
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
