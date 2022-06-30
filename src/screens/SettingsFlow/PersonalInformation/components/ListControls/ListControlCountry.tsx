// SPDX-License-Identifier: BUSL-1.1

import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {COLORS} from '@constants/colors';
import {countriesCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {ListControlBase} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import React, {memo, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

type Props = {
  label: string;
};

export const ListControlCountry = memo(({label}: Props) => {
  const [selectedCountry, setSelectedCountry] = useState(countriesCode[0]);
  const [isCountryCodeSearchVisible, setCountryCodeSearchVisibility] =
    useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setCountryCodeSearchVisibility(true)}>
        <ListControlBase label={label}>
          <Text style={styles.countryText}>{selectedCountry.name}</Text>
        </ListControlBase>
      </TouchableOpacity>
      {isCountryCodeSearchVisible && (
        <PhoneNumberSearch
          containerStyle={styles.countrySearch}
          selectedCountry={selectedCountry}
          close={() => setCountryCodeSearchVisibility(false)}
          setCountryCode={setSelectedCountry}
          headerStyle={styles.searchHeader}
          showCode={false}
        />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  countryText: {
    color: COLORS.greyText,
    fontFamily: FONTS.primary.bold,
    fontSize: font(12),
    alignSelf: 'center',
  },
  countrySearch: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  searchHeader: {
    height: rem(50),
  },
});
