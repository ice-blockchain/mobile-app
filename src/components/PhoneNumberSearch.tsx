// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {countriesCode, ICountryCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import CloseIconSvg from '@svg/closeIcon';
import SearchIconSvg from '@svg/searchIcon';
import {debounce} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

interface PhoneNumberSearchProps {
  selectedCountry: ICountryCode;
  containerStyle?: StyleProp<ViewStyle>;
  close: () => void;
  setCountryCode: (v: ICountryCode) => void;
}

const PhoneNumberSearch = ({
  selectedCountry,
  containerStyle,
  close,
  setCountryCode,
}: PhoneNumberSearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [countriesCodeItems, setCountriesCodeItems] = useState(countriesCode);

  useEffect(
    () =>
      debounce(() => {
        if (!isNaN(+searchValue)) {
          setCountriesCodeItems(
            countriesCode.filter(v => v.code.includes(searchValue)),
          );
        } else {
          setCountriesCodeItems(
            countriesCode.filter(v =>
              v.name.toLowerCase().startsWith(searchValue.toLowerCase()),
            ),
          );
        }
      }, 500)(),
    [searchValue],
  );

  const onItemPress = (v: ICountryCode) => () => {
    setCountryCode(v);
    close();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.countryIcon}>{selectedCountry.icon}</Text>

        <Text style={styles.name}>{selectedCountry.name}</Text>

        <TouchableOpacity style={styles.closeButton} onPress={close}>
          <CloseIconSvg />
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <SearchIconSvg />

        <TextInput
          value={searchValue}
          placeholder={'Search for country'}
          style={styles.input}
          onChangeText={setSearchValue}
        />
      </View>

      <ScrollView keyboardShouldPersistTaps={'handled'}>
        {countriesCodeItems.map(v => (
          <TouchableOpacity
            key={v.name}
            style={styles.searchItem}
            onPress={onItemPress(v)}>
            <Text style={styles.countryIcon}>{v.icon}</Text>
            <Text style={styles.name}>
              {v.name}
              <Text style={styles.code}>{` (${v.code})`}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PhoneNumberSearch;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 13,
    borderColor: COLORS.greyBorder,
    height: 311,
    backgroundColor: COLORS.white,
  },
  countryIcon: {
    fontSize: font(24),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: rem(15),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyBorder,
  },
  name: {
    fontSize: font(15),
    fontFamily: FONTS.primary.regular,
    flex: 1,
    marginLeft: font(4),
    color: '#707489',
  },
  closeButton: {
    paddingHorizontal: font(12),
    paddingVertical: font(20),
  },
  search: {
    paddingHorizontal: font(16),
    paddingVertical: font(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingLeft: font(9),
    fontSize: font(15),
    fontFamily: FONTS.primary.regular,
    color: COLORS.darkBlue,
    flex: 1,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: font(12),
    paddingBottom: font(15),
  },
  code: {
    color: COLORS.darkBlue,
  },
});
