// SPDX-License-Identifier: ice License 1.0

import {CheckMark} from '@components/CheckMark';
import {SearchInput} from '@components/Inputs/SearchInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {CountryListItem} from '@components/ListItems/CountryListItem';
import {Touchable} from '@components/Touchable';
import {countries, Country} from '@constants/countries';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import debounce from 'lodash/debounce';
import React, {useCallback, useMemo, useState} from 'react';
import {ListRenderItem, StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

type Props = {
  onSelect: (country: Country) => void;
  dontShowPhoneCodes?: boolean;
  keyboardVerticalOffset?: number;
};

export function CountrySelectFeed({
  onSelect,
  dontShowPhoneCodes,
  keyboardVerticalOffset,
}: Props) {
  const bottomOffsetStyle = useBottomOffsetStyle({extraOffset: rem(12)});
  const [searchCountries, setSearchCountries] = useState(countries);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const search = useMemo(
    () =>
      debounce((term: string) => {
        setSearchCountries(
          term
            ? countries.filter(c =>
                c.name.toLowerCase().includes(term.toLowerCase()),
              )
            : countries,
        );
      }, 600),
    [],
  );

  const renderItem: ListRenderItem<Country> = useCallback(
    ({item}) => {
      return (
        <Touchable
          key={item.isoCode}
          onPress={() => {
            onSelect(item);
            setSelectedCountry(item);
          }}>
          <CountryListItem
            code={item.isoCode}
            AdditionalInfoComponent={
              selectedCountry?.isoCode === item.isoCode ? (
                <CheckMark />
              ) : dontShowPhoneCodes ? null : (
                <Text style={styles.iddCodeText}>{item.iddCode}</Text>
              )
            }
            nameStyle={styles.countryNameText}
            containerStyle={styles.countryContainer}
          />
        </Touchable>
      );
    },
    [dontShowPhoneCodes, onSelect, selectedCountry?.isoCode],
  );
  return (
    <KeyboardAvoider keyboardVerticalOffset={keyboardVerticalOffset}>
      <SearchInput
        onChangeText={search}
        placeholder={t('button.search')}
        containerStyle={styles.search}
      />
      <FlatList
        data={searchCountries}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, bottomOffsetStyle.current]}
        keyboardShouldPersistTaps={'handled'}
      />
    </KeyboardAvoider>
  );
}

const styles = StyleSheet.create({
  search: {
    marginHorizontal: rem(16),
    marginBottom: rem(6),
  },
  listContent: {
    paddingHorizontal: rem(16),
  },
  countryContainer: {
    marginTop: rem(12),
  },
  countryNameText: {
    ...font(17, 22, 'regular', 'gunmetalGrey'),
  },
  iddCodeText: {
    ...font(15, 22, 'regular', 'gunmetalGrey'),
  },
});
