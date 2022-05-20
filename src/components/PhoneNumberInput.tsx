// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {ICountryCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import ArrowDownIcon from '@svg/arrowDownIcon';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {font, rem} from 'rn-units';

interface PhoneNumberInputProps {
  selectedCountry: ICountryCode;
  containerStyle?: StyleProp<ViewStyle>;
  showCountryCodeSearch: () => void;
  value: string;
  onValueChange: (v: string) => void;
}

const PhoneNumberInput = ({
  selectedCountry,
  containerStyle,
  showCountryCodeSearch,
  value,
  onValueChange,
}: PhoneNumberInputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.countryIconContainer}
        onPress={showCountryCodeSearch}>
        <View style={styles.countryCodeWrapper}>
          <Text style={styles.countryIcon}>{selectedCountry.icon}</Text>

          <ArrowDownIcon />
        </View>
      </TouchableOpacity>

      <Text style={styles.code}>{selectedCountry.code}</Text>

      <TextInput
        placeholder={'| Phone Number'}
        keyboardType={'phone-pad'}
        style={styles.phone}
        value={value}
        onChangeText={onValueChange}
      />
    </View>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 13,
    borderColor: COLORS.greyBorder,
    alignItems: 'center',
    minHeight: rem(46),
  },
  countryIcon: {
    fontSize: font(24),
    paddingRight: 7,
  },
  countryIconContainer: {
    height: '100%',
    borderRightWidth: 1.5,
    borderRightColor: COLORS.greyBorder,
    paddingLeft: 15,
    paddingRight: 12,
  },
  code: {
    color: COLORS.darkBlue,
    fontSize: font(14),
    paddingRight: 5,
    fontFamily: FONTS.primary.black,
    paddingLeft: 9,
  },
  phone: {
    fontSize: font(15),
    fontFamily: FONTS.primary.regular,
    color: COLORS.darkBlue,
  },
  countryCodeWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
});
