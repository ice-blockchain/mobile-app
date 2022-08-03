// SPDX-License-Identifier: BUSL-1.1

import {PhoneNumberInput} from '@components/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {PrimaryButton} from '@components/PrimaryButton';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {deviceCountrySelector} from '@store/modules/Devices/selectors';
import {t} from '@translations/i18n';
import {formatPhoneNumber} from '@utils/phoneNumber';
import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {font, rem} from 'rn-units';

type Props = {
  onSubmitPress: (phone: string) => void;
  showCountriesList: (t: boolean) => void;
  isCountriesVisible: boolean;
};

export function ModifyPhoneNumber({
  onSubmitPress,
  showCountriesList,
  isCountriesVisible,
}: Props) {
  const deviceCountry = useSelector(deviceCountrySelector);

  const [phone, setPhone] = useState('');
  const [focused, setFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(deviceCountry);

  const phoneNumberInputRef = useRef<TextInput | null>(null);

  const handleOnPress = () => {
    onSubmitPress(selectedCountry.iddCode + phone);
  };
  const showCountryCodeSearch = () => {
    showCountriesList(true);
  };
  const hideCountryCodeSearch = () => {
    showCountriesList(false);
  };

  const tabbarOffest = useBottomTabBarOffsetStyle();

  const onPhoneNumberChange = (phoneNumber: string) => {
    setPhone(
      formatPhoneNumber(
        `${selectedCountry.iddCode}${phoneNumber}`,
        selectedCountry.isoCode,
        selectedCountry.iddCode,
      ),
    );
  };

  return (
    <View style={[styles.container, tabbarOffest.current]}>
      {!focused && (
        <Image
          source={Images.phone.modifyPhoneNumber}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.title}>{t('team.confirm_phone.title')}</Text>
      {!focused && (
        <Text style={styles.description}>
          {t('team.confirm_phone.description')}
        </Text>
      )}
      <PhoneNumberInput
        selectedCountry={selectedCountry}
        showCountryCodeSearch={showCountryCodeSearch}
        value={phone}
        containerStyle={styles.input}
        onValueChange={onPhoneNumberChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={phoneNumberInputRef}
      />
      <PrimaryButton
        text={t('team.confirm_phone.button')}
        onPress={handleOnPress}
        style={styles.allowAccessButton}
      />
      {isCountriesVisible && (
        <PhoneNumberSearch
          containerStyle={styles.phoneNumberSearch}
          selectedCountry={selectedCountry}
          close={hideCountryCodeSearch}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          setCountryCode={c => {
            phoneNumberInputRef.current?.focus();
            setSelectedCountry(c);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: rem(25),
    marginBottom: rem(15),
    marginHorizontal: rem(27),
  },
  image: {
    alignSelf: 'center',
    flex: 1,
    maxHeight: rem(200),
  },
  title: {
    fontSize: font(24),
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(2),
  },
  description: {
    fontSize: font(14),
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    lineHeight: rem(24),
  },
  allowAccessButton: {
    marginTop: rem(25),
  },
  input: {
    marginTop: rem(20),
  },
  phoneNumberSearch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
