// SPDX-License-Identifier: BUSL-1.1

import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {COLORS} from '@constants/colors';
import {ICountryCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {ListControlBase} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

type Props = {
  label: string;
  selectedCountry: ICountryCode;
  isCountrySearchVisible: boolean;
  setCountrySearchVisibility: (visible: boolean) => void;
  onCountrySelect: (country: ICountryCode) => void;
};

export const ListControlCountry = memo(
  ({
    label,
    selectedCountry,
    isCountrySearchVisible,
    setCountrySearchVisibility,
    onCountrySelect,
  }: Props) => {
    return (
      <>
        <TouchableOpacity onPress={() => setCountrySearchVisibility(true)}>
          <ListControlBase label={label}>
            <Text style={styles.countryText}>{selectedCountry.name}</Text>
          </ListControlBase>
        </TouchableOpacity>
        {isCountrySearchVisible && (
          <PhoneNumberSearch
            containerStyle={styles.countrySearch}
            selectedCountry={selectedCountry}
            close={() => setCountrySearchVisibility(false)}
            setCountryCode={onCountrySelect}
            headerStyle={styles.searchHeader}
            showCode={false}
          />
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  countryText: {
    color: COLORS.greyText,
    fontFamily: FONTS.primary.bold,
    fontSize: font(14),
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
