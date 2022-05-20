// SPDX-License-Identifier: BUSL-1.1

import {FONTS} from '@constants/fonts';
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

interface PhoneNumberInputProps {
  selectedCountry: {
    name: string;
    code: string;
    icon: string;
  };
  containerStyle?: StyleProp<ViewStyle>;
  showCountryCodeSearch: () => void;
}

const PhoneNumberInput = ({
  selectedCountry,
  containerStyle,
  showCountryCodeSearch,
}: PhoneNumberInputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.countryIconContainer}
        onPress={showCountryCodeSearch}>
        <Text style={styles.countryIcon}>{selectedCountry.icon}</Text>
      </TouchableOpacity>

      <Text style={styles.code}>{selectedCountry.code}</Text>

      <TextInput
        placeholder={'| Phone Number'}
        keyboardType={'phone-pad'}
        style={styles.phone}
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
    borderColor: '#B6B4BA',
    alignItems: 'center',
  },
  countryIcon: {
    fontSize: 24,
  },
  countryIconContainer: {
    paddingVertical: 11,
    borderRightWidth: 1.5,
    borderRightColor: '#B6B4BA',
    paddingLeft: 15,
    paddingRight: 12,
  },
  code: {
    color: '#0D265E',
    fontSize: 14,
    paddingRight: 5,
    fontFamily: FONTS.primary.black,
    paddingLeft: 9,
  },
  phone: {
    fontSize: 15,
    fontFamily: FONTS.primary.regular,
    color: '#0D265E',
  },
});
