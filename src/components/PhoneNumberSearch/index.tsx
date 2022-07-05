// SPDX-License-Identifier: BUSL-1.1

import {
  COUNTRY_ITEM_HEIGHT,
  CountryListItem,
} from '@components/PhoneNumberSearch/components/CountryListItem';
import {COLORS} from '@constants/colors';
import {countriesCode, ICountryCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {IS_SMALL_SCREEN} from '@constants/styles';
import {CloseIconSvg} from '@svg/CloseIcon';
import {SearchIconSvg} from '@svg/SearchIcon';
import {t} from '@translations/i18n';
import {debounce} from 'lodash';
import React, {useCallback, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

interface PhoneNumberSearchProps {
  selectedCountry: ICountryCode;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  showCode?: boolean;
  close: () => void;
  setCountryCode: (v: ICountryCode) => void;
}

export const PhoneNumberSearch = ({
  selectedCountry,
  containerStyle,
  headerStyle,
  showCode = true,
  close,
  setCountryCode,
}: PhoneNumberSearchProps) => {
  const [countriesCodeItems, setCountriesCodeItems] = useState(countriesCode);

  const setSearchValue = (searchValue: string) =>
    debounce(() => {
      if (!isNaN(+searchValue)) {
        setCountriesCodeItems(
          countriesCode.filter(v => v.iddCode.includes(searchValue)),
        );
      } else {
        setCountriesCodeItems(
          countriesCode.filter(v =>
            v.name.toLowerCase().startsWith(searchValue.toLowerCase()),
          ),
        );
      }
    }, 500)();

  const onCountryPress = useCallback(
    (country: ICountryCode) => {
      setCountryCode(country);
      close();
    },
    [close, setCountryCode],
  );

  const renderCountry = useCallback(
    ({item}: {item: ICountryCode}) => {
      return (
        <CountryListItem
          onPress={onCountryPress}
          showCode={showCode}
          country={item}
        />
      );
    },
    [onCountryPress, showCode],
  );

  const getItemLayout = useCallback((data, index) => {
    return {
      length: COUNTRY_ITEM_HEIGHT,
      offset: COUNTRY_ITEM_HEIGHT * index,
      index,
    };
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.header, headerStyle]}>
        <Text style={styles.countryIcon}>{selectedCountry.flag}</Text>
        <Text style={styles.name}>{selectedCountry.name}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={close}>
          <CloseIconSvg />
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <SearchIconSvg />
        <TextInput
          placeholder={t('button.search_country')}
          style={styles.input}
          onChangeText={setSearchValue}
          autoFocus
          autoCorrect={false}
          spellCheck={false}
          keyboardType="name-phone-pad"
        />
      </View>
      <FlatList
        data={countriesCodeItems}
        renderItem={renderCountry}
        maxToRenderPerBatch={30}
        getItemLayout={getItemLayout}
        keyboardShouldPersistTaps={'handled'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: rem(13),
    borderColor: COLORS.greyBorder,
    height: IS_SMALL_SCREEN ? rem(240) : rem(311),
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
    paddingVertical: rem(8),
  },
  name: {
    fontSize: font(15),
    fontFamily: FONTS.primary.regular,
    flex: 1,
    marginLeft: rem(4),
    color: COLORS.greyText,
  },
  closeButton: {
    paddingHorizontal: rem(12),
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  search: {
    paddingHorizontal: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingLeft: rem(9),
    paddingVertical: rem(10),
    fontSize: font(15),
    fontFamily: FONTS.primary.regular,
    color: COLORS.darkBlue,
    flex: 1,
  },
});
