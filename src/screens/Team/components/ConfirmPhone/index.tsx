// SPDX-License-Identifier: BUSL-1.1

import {PhoneNumberInput} from '@components/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {PrimaryButton} from '@components/PrimaryButton';
import {countriesCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {IS_SMALL_SCREEN, SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {t} from '@translations/i18n';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, Keyboard, StyleSheet, Text, View} from 'react-native';
import {font, isIOS, rem, screenWidth} from 'rn-units';

const confirmPhoneImage = require('../../../../assets/images/phone/confirmPhone.png');

type ConfirmPhoneProps = {
  confirmPhonePress: (phone: string) => void;
};

export function ConfirmPhone({
  confirmPhonePress,
}: ConfirmPhoneProps): React.ReactElement {
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countriesCode[0]);
  const [isCountryCodeSearchVisible, setCountryCodeSearchVisibility] =
    useState<boolean>(false);
  const handleOnPress = () => {
    confirmPhonePress(phone);
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const showCountryCodeSearch = () => {
    setCountryCodeSearchVisibility(true);
  };
  const hideCountryCodeSearch = () => {
    setCountryCodeSearchVisibility(false);
  };

  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isKeyboardVisible) {
      Animated.timing(translation, {
        toValue: isCountryCodeSearchVisible ? (isIOS ? -80 : -140) : 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [isCountryCodeSearchVisible, isKeyboardVisible, translation]);

  const tabbarOffest = useBottomTabBarOffsetStyle({
    extraOffset: IS_SMALL_SCREEN ? (isIOS ? undefined : 20) : undefined,
  });

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
            source={confirmPhoneImage}
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
