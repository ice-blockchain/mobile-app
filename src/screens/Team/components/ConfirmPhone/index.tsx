// SPDX-License-Identifier: BUSL-1.1

import {PhoneNumberInput} from '@components/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {PrimaryButton} from '@components/PrimaryButton';
import {countriesCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {IS_SMALL_SCREEN, SCREEN_SIDE_OFFSET} from '@constants/styles';
import useIsKeyboardShown from '@hooks/useIsKeyboardShown';
import {Images} from '@images';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {t} from '@translations/i18n';
import {formatPhoneNumberForInput} from '@utils/number';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import {font, isIOS, rem, screenWidth} from 'rn-units';

type ConfirmPhoneProps = {
  confirmPhonePress: (phone: string) => void;
  showCountriesList: (t: boolean) => void;
  isCountriesVisible: boolean;
};

export function ConfirmPhone({
  confirmPhonePress,
  showCountriesList,
  isCountriesVisible,
}: ConfirmPhoneProps): React.ReactElement {
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countriesCode[0]);
  const handleOnPress = () => {
    confirmPhonePress(phone);
  };
  const isKeyboardVisible = useIsKeyboardShown();

  const showCountryCodeSearch = () => {
    showCountriesList(true);
  };
  const hideCountryCodeSearch = () => {
    showCountriesList(false);
  };

  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: isCountriesVisible ? (isIOS ? -80 : -140) : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isCountriesVisible, isKeyboardVisible, translation]);

  const tabbarOffest = useBottomTabBarOffsetStyle({
    extraOffset: IS_SMALL_SCREEN ? (isIOS ? undefined : 20) : undefined,
  });

  const onPhoneNumberChange = (v: string) => {
    setPhone(formatPhoneNumberForInput(v, selectedCountry));
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {transform: [{translateY: translation}]},
        tabbarOffest.current,
      ]}>
      <View style={styles.container}>
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

        <View style={styles.inputContainer}>
          <PhoneNumberInput
            selectedCountry={selectedCountry}
            showCountryCodeSearch={showCountryCodeSearch}
            value={phone}
            containerStyle={styles.input}
            onValueChange={onPhoneNumberChange}
          />
          <PrimaryButton
            text={t('team.confirm_phone.button')}
            onPress={handleOnPress}
            style={styles.allowAccessButton}
          />
          {isCountriesVisible ? (
            <PhoneNumberSearch
              containerStyle={styles.phoneNumberSearch}
              selectedCountry={selectedCountry}
              close={hideCountryCodeSearch}
              setCountryCode={setSelectedCountry}
            />
          ) : null}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    width: screenWidth,
    marginTop: rem(25),
    paddingHorizontal: rem(27),
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
    marginHorizontal: SCREEN_SIDE_OFFSET,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
