// SPDX-License-Identifier: BUSL-1.1

import {phoneNumberCountries} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import CloseIconSvg from '@svg/closeIcon';
import SearchIconSvg from '@svg/searchIcon';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

interface PhoneNumberSearchProps {
  selectedCountry: {
    name: string;
    code: string;
    icon: string;
  };
  containerStyle?: StyleProp<ViewStyle>;
  close: () => void;
  setCountryCode: (v: {name: string; code: string; icon: string}) => void;
}

const PhoneNumberSearch = ({
  selectedCountry,
  containerStyle,
  close,
  setCountryCode,
}: PhoneNumberSearchProps) => {
  const onItemPress = (v: {name: string; code: string; icon: string}) => () => {
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

        <TextInput placeholder={'Search for country'} style={styles.input} />
      </View>

      <ScrollView>
        {phoneNumberCountries.map(v => (
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
    borderColor: '#B6B4BA',
    height: 311,
    backgroundColor: '#fff',
  },
  countryIcon: {
    fontSize: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#B6B4BA',
  },
  name: {
    fontSize: 15,
    fontFamily: FONTS.primary.regular,
    flex: 1,
    marginLeft: 4,
    color: '#707489',
  },
  closeButton: {
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  search: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 9,
    fontSize: 15,
    fontFamily: FONTS.primary.regular,
    color: '#0D265E',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingBottom: 15,
  },
  code: {
    color: '#0D265E',
  },
});
