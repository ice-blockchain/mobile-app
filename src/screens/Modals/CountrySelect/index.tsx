// SPDX-License-Identifier: ice License 1.0

import {CountrySelectFeed} from '@components/CountrySelectFeed';
import {Country} from '@constants/countries';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {MainStackParamList} from '@navigation/Main';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {t} from '@translations/i18n';
import React from 'react';
import {View} from 'react-native';
import {isIOS} from 'rn-units';

export const CountrySelect = () => {
  const {
    params: {onSelect},
  } = useRoute<RouteProp<MainStackParamList, 'CountrySelect'>>();
  const navigation = useNavigation();

  return (
    <View style={commonStyles.flexOne}>
      <Header
        title={t('country_select.title')}
        backLabel={t('button.back')}
        topMargin={isIOS ? 0 : undefined}
      />
      <CountrySelectFeed
        onSelect={(country: Country) => {
          navigation.goBack();
          onSelect(country);
        }}
      />
    </View>
  );
};
