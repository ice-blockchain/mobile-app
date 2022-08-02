// SPDX-License-Identifier: BUSL-1.1

import {PhoneNumberInput} from '@components/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {PrimaryButton} from '@components/PrimaryButton';
import {FONTS} from '@constants/fonts';
import {IS_SMALL_SCREEN, SCREEN_SIDE_OFFSET} from '@constants/styles';
import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {Images} from '@images';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {deviceCountrySelector} from '@store/modules/Devices/selectors';
import {t} from '@translations/i18n';
import {formatPhoneNumber} from '@utils/phoneNumber';
import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {font, isIOS, rem, screenWidth} from 'rn-units';

type ConfirmPhoneProps = {
  confirmPhonePress: (phone: string) => void;
  showCountriesList: (t: boolean) => void;
  isCountriesVisible: boolean;
  hideBodyOnKeyboardOpen?: boolean;
};

export function ConfirmPhone({
  confirmPhonePress,
  showCountriesList,
  isCountriesVisible,
  hideBodyOnKeyboardOpen = false,
}: ConfirmPhoneProps): React.ReactElement {
  const deviceCountry = useSelector(deviceCountrySelector);

  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(deviceCountry);

  const isKeyboardShown = useIsKeyboardShown();

  const phoneNumberInputRef = useRef<TextInput | null>(null);

  const handleOnPress = () => {
    confirmPhonePress(selectedCountry.iddCode + phone);
  };
  const showCountryCodeSearch = () => {
    showCountriesList(true);
  };
  const hideCountryCodeSearch = () => {
    showCountriesList(false);
  };

  const tabbarOffest = useBottomTabBarOffsetStyle({
    extraOffset: IS_SMALL_SCREEN ? (isIOS ? undefined : 20) : undefined,
  });

  const onPhoneNumberChange = (phoneNumber: string) => {
    setPhone(
      formatPhoneNumber(
        `${selectedCountry.iddCode}${phoneNumber}`,
        selectedCountry.isoCode,
      )
        .replace(selectedCountry.iddCode, '')
        .trim(),
    );
  };

  return (
    <View style={[styles.container, tabbarOffest.current]}>
      {(!isKeyboardShown || !hideBodyOnKeyboardOpen) && (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={Images.phone.confirmPhone}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>{t('team.confirm_phone.title')}</Text>
          <Text style={styles.description}>
            {t('team.confirm_phone.description')}
          </Text>
        </>
      )}
      <PhoneNumberInput
        selectedCountry={selectedCountry}
        showCountryCodeSearch={showCountryCodeSearch}
        value={phone}
        containerStyle={styles.input}
        onValueChange={onPhoneNumberChange}
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
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    maxHeight: rem(200),
  },
  image: {
    flex: 1,
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
    marginTop: rem(7),
    marginBottom: rem(20),
    lineHeight: rem(24),
  },
  allowAccessButton: {
    marginTop: rem(25),
    width: screenWidth - rem(54),
  },
  input: {
    width: screenWidth - rem(54),
  },
  phoneNumberSearch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
