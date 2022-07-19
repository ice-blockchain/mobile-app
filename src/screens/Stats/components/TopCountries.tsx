// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {commonStyles} from '@constants/styles';
import {HomeTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TopCountriesItem} from '@screens/Stats/components/TopCountriesItem';
import {topFiveCoutriesSelector} from '@store/modules/Statistics/selectors';
import {ArrowRightStatsSvg} from '@svg/ArrowRightStats';
import {t} from '@translations/i18n';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {font, rem} from 'rn-units';

interface TopCountriesProps {}

export const TopCountries = ({}: TopCountriesProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();
  const onPress = () => navigation.navigate('TopCountries');

  const topFiveCountries = useSelector(topFiveCoutriesSelector);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('stats.top_countries')}</Text>
      <Text style={styles.description}>{t('stats.most_active_countries')}</Text>

      <View style={[styles.countries, commonStyles.shadow]}>
        {topFiveCountries.map(country => (
          <TopCountriesItem
            icon={country.icon}
            countryName={country.countryName}
            users={country.users}
            key={country.countryName}
          />
        ))}

        <TouchableOpacity style={styles.seeAllCountries} onPress={onPress}>
          <Text style={styles.seeAllCountriesText}>
            {t('stats.see_all_countries')}
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
});
