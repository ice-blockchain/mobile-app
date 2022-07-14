// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {ArrowRightStatsSvg} from '@svg/ArrowRightStats';
import {UserMultipleSvg} from '@svg/UserMultiple';
import {translate} from '@translations/i18n';
import {numberWithCommas} from '@utils/number';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

interface TopCountriesProps {}

const topCountries = [
  {
    icon: '🇺🇸',
    countryName: 'USA',
    users: 9214144,
  },
  {
    icon: '🇦🇪',
    countryName: 'United Emirates',
    users: 1214144,
  },
  {
    icon: '🇻🇪',
    countryName: 'Venezuela',
    users: 541005,
  },
  {
    icon: '🇷🇴',
    countryName: 'Romania',
    users: 144114,
  },
  {
    icon: '🇮🇹',
    countryName: 'Italy',
    users: 23980,
  },
];

export const TopCountries = ({}: TopCountriesProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate('stats.top_countries')}</Text>
      <Text style={styles.description}>
        {translate('stats.most_active_countries')}
      </Text>

      <View style={styles.countries}>
        {topCountries.map(v => (
          <View key={v.countryName} style={styles.user}>
            <View style={styles.country}>
              <Text style={styles.countryIcon}>{v.icon}</Text>
              <Text style={styles.countryName}>{v.countryName}</Text>
            </View>

            <View style={styles.usersContainer}>
              <UserMultipleSvg />
              <Text style={styles.users}>{numberWithCommas(v.users)}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.seeAllCountries}>
          <Text style={styles.seeAllCountriesText}>
            {translate('stats.see_all_countries')}
          </Text>
          <ArrowRightStatsSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rem(24),
    paddingVertical: rem(32),
  },
  title: {
    fontSize: font(15),
    color: COLORS.black,
    fontFamily: FONTS.primary.black,
    marginBottom: rem(4),
  },
  description: {
    fontSize: font(13),
    color: '#747474',
    fontFamily: FONTS.primary.medium,
    marginBottom: rem(14),
  },
  countries: {
    backgroundColor: COLORS.white,
    borderRadius: 16,

    shadowColor: COLORS.mariner,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  user: {
    flexDirection: 'row',
    paddingHorizontal: rem(24),
    alignItems: 'center',
    paddingVertical: rem(13),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4FB',
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
  users: {
    fontSize: font(12),
    color: COLORS.greyText,
    fontFamily: FONTS.primary.bold,
    marginLeft: 6,
  },
  seeAllCountries: {
    paddingHorizontal: rem(26),
    paddingTop: rem(12),
    paddingBottom: rem(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllCountriesText: {
    fontSize: font(12),
    color: COLORS.darkBlue,
    fontFamily: FONTS.primary.bold,
    marginRight: rem(10),
    lineHeight: rem(20),
    textTransform: 'uppercase',
  },
  usersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
