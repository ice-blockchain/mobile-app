// SPDX-License-Identifier: BUSL-1.1

import {PhoneNumberInput} from '@components/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {PrimaryButton} from '@components/PrimaryButton';
import {countriesCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {t} from '@translations/i18n';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {font, rem, screenWidth} from 'rn-units';

const icon = require('../../assets/images/teamConfirmPhone.png');

type ConfirmPhoneProps = {
  confirmPhonePress: () => void;
};

export function ConfirmPhone({
  confirmPhonePress,
}: ConfirmPhoneProps): React.ReactElement {
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countriesCode[0]);
  const [isCountryCodeSearchVisible, setCountryCodeSearchVisibility] =
    useState<boolean>(false);
  const handleOnPress = () => {
    confirmPhonePress();
  };

  const showCountryCodeSearch = () => {
    setCountryCodeSearchVisibility(true);
  };
  const hideCountryCodeSearch = () => {
    setCountryCodeSearchVisibility(false);
  };

  const tabbarOffest = useBottomTabBarOffsetStyle({
    extraOffset: isCountryCodeSearchVisible ? 150 : 0,
  });
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tabbarOffest.current}>
      <View style={styles.container}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{t('team.confirm_phone.title')}</Text>
        <Text style={styles.description}>
          {t('team.confirm_phone.description')}
        </Text>
        <View style={styles.inputContainer}>
          <PhoneNumberInput
            selectedCountry={selectedCountry}
            showCountryCodeSearch={showCountryCodeSearch}
            value={phone}
            containerStyle={styles.input}
            onValueChange={setPhone}
          />
          <PrimaryButton
            text={t('team.confirm_phone.button')}
            onPress={handleOnPress}
            style={styles.allowAccessButton}
          />
          {isCountryCodeSearchVisible ? (
            <PhoneNumberSearch
              containerStyle={styles.phoneNumberSearch}
              selectedCountry={selectedCountry}
              close={hideCountryCodeSearch}
              setCountryCode={setSelectedCountry}
            />
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollAdditionalPadding: {
    paddingBottom: 400,
  },
  inputContainer: {
    width: screenWidth,
    marginTop: 25,
    paddingHorizontal: rem(27),
  },
  icon: {
    width: rem(200),
    height: rem(170),
    marginTop: rem(16),
  },
  title: {
    fontSize: font(24),
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
    marginHorizontal: rem(24),
    marginTop: rem(2),
  },
  description: {
    fontSize: font(14),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: 24,
    marginTop: rem(7),
    lineHeight: rem(24),
  },
  allowAccessButton: {
    marginTop: rem(25),
    width: screenWidth - 54,
  },
  input: {
    width: screenWidth - 54,
  },
  phoneNumberSearch: {
    marginHorizontal: rem(27),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
