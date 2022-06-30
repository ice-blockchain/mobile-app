// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {ICountryCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {font, rem} from 'rn-units';

type Props = {
  onPress: (country: ICountryCode) => void;
  country: ICountryCode;
  showCode: boolean;
};

export const COUNTRY_ITEM_HEIGHT = rem(36);

export const CountryListItem = memo(({country, showCode, onPress}: Props) => {
  return (
    <TouchableOpacity
      key={country.name}
      style={styles.searchItem}
      onPress={() => onPress(country)}>
      <Text style={styles.countryIcon}>{country.flag}</Text>
      <Text style={styles.nameText}>
        {country.name}
        {showCode && <Text style={styles.code}>{` (${country.iddCode})`}</Text>}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  countryIcon: {
    fontSize: font(24),
  },
  nameText: {
    fontSize: font(15),
    fontFamily: FONTS.primary.regular,
    flex: 1,
    marginLeft: rem(4),
    color: COLORS.greyText,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: rem(12),
    height: COUNTRY_ITEM_HEIGHT,
  },
  code: {
    color: COLORS.darkBlue,
  },
});
