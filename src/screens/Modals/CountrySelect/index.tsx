// SPDX-License-Identifier: ice License 1.0

import {SearchInput} from '@components/Inputs/SearchInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {CountryListItem} from '@components/ListItems/CountryListItem';
import {Touchable} from '@components/Touchable';
import {countries} from '@constants/countries';
import {Header} from '@navigation/components/Header';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import debounce from 'lodash/debounce';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {isIOS, rem} from 'rn-units';

export const CountrySelect = () => {
  const {
    params: {onSelect},
  } = useRoute<RouteProp<MainStackParamList, 'CountrySelect'>>();
  const bottomOffsetStyle = useBottomOffsetStyle({extraOffset: rem(12)});
  const navigation = useNavigation();
  const [searchCountries, setSearchCountries] = useState(countries);

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

  const renderItem = useCallback(
    ({item}) => {
      return (
        <Touchable
          onPress={() => {
            navigation.goBack();
            onSelect(item);
          }}>
          <CountryListItem
            code={item.isoCode}
            AdditionalInfoComponent={
              <Text style={styles.iddCodeText}>{item.iddCode}</Text>
            }
            nameStyle={styles.countryNameText}
            containerStyle={styles.countryContainer}
          />
        </Touchable>
      );
    },
    [navigation, onSelect],
  );

  return (
    <KeyboardAvoider
      keyboardVerticalOffset={isIOS ? 57 : 0} // presentation: modal top offset on iOS
    >
      <Header
        title={t('country_select.title')}
        backLabel={t('button.back')}
        topMargin={isIOS ? 0 : undefined}
      />
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
};

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
    ...font(17, 22, 'regular', 'codeFieldText'),
  },
  iddCodeText: {
    ...font(15, 22, 'regular', 'codeFieldText'),
  },
});
