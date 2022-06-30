// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar';
import {PhoneNumberInput} from '@components/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {COLORS} from '@constants/colors';
import {countriesCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import React, {memo, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

export const ConfirmNewPhone = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const [selectedCountry, setSelectedCountry] = useState(countriesCode[0]);
  const [isCountryCodeSearchVisible, setCountryCodeSearchVisibility] =
    useState(false);
  const [phone, setPhone] = useState('');
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={-bottomOffset.current.paddingBottom + rem(20)}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header
        color={COLORS.white}
        title={'Personal Information'}
        titlePreset={'small'}
        renderRightButtons={LangButton}
      />
      <View style={[styles.card, bottomOffset.current]}>
        <View style={styles.body}>
          <View style={styles.imageWrapper}>
            <Image
              source={Images.phone.confirmPhone}
              style={styles.image}
              resizeMode={'contain'}
            />
          </View>
          <View>
            <Text style={styles.titleText}>Confirm New Phone</Text>
            <Text style={styles.noteText}>
              Please confirm your country code and enter your new phone number.
            </Text>
            <View style={styles.controlWrapper}>
              <PhoneNumberInput
                selectedCountry={selectedCountry}
                showCountryCodeSearch={() =>
                  setCountryCodeSearchVisibility(true)
                }
                value={phone}
                onValueChange={setPhone}
              />
              {isCountryCodeSearchVisible && (
                <PhoneNumberSearch
                  containerStyle={styles.phoneNumberSearch}
                  selectedCountry={selectedCountry}
                  close={() => setCountryCodeSearchVisibility(false)}
                  setCountryCode={setSelectedCountry}
                />
              )}
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Confirm new phone number</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Avatar
          showPen
          uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
          style={styles.avatar}
        />
      </View>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    marginTop: rem(80),
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
    flex: 1,
  },
  avatar: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
  },
  body: {
    alignItems: 'center',
    marginHorizontal: rem(50),
    flex: 1,
    marginTop: rem(55),
  },
  imageWrapper: {
    flex: 1,
    maxWidth: rem(200),
  },
  image: {
    flex: 1,
  },
  titleText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(24),
    lineHeight: font(28),
    color: COLORS.darkBlue,
    textAlign: 'center',
  },
  noteText: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(14),
    lineHeight: font(24),
    color: COLORS.darkBlue,
    textAlign: 'center',
    marginTop: rem(7),
  },
  controlWrapper: {
    alignSelf: 'stretch',
    marginTop: rem(25),
  },
  phoneNumberSearch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  button: {
    marginTop: rem(20),
    height: rem(45),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rem(10),
    backgroundColor: COLORS.primary,
    borderRadius: rem(11),
  },
  buttonText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(14),
    color: COLORS.white,
  },
});
