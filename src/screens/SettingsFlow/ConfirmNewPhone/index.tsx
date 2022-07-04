// SPDX-License-Identifier: BUSL-1.1

import {Avatar} from '@components/Avatar';
import {KeyboardDismiss, stopPropagination} from '@components/KeyboardDismiss';
import {PhoneNumberInput} from '@components/PhoneNumberInput';
import {PhoneNumberSearch} from '@components/PhoneNumberSearch';
import {COLORS} from '@constants/colors';
import {countriesCode} from '@constants/countries';
import {FONTS} from '@constants/fonts';
import {commonStyles} from '@constants/styles';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from '@translations/i18n';
import React, {memo, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

export const ConfirmNewPhone = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const phoneNumberInputRef = useRef<TextInput | null>(null);

  const [selectedCountry, setSelectedCountry] = useState(countriesCode[0]);
  const [isCountrySearchVisible, setCountrySearchVisibility] = useState(false);
  const [phone, setPhone] = useState('');

  return (
    <KeyboardDismiss onDismiss={() => setCountrySearchVisibility(false)}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Header
          color={COLORS.white}
          title={t('personal_information.title')}
          titlePreset={'small'}
          renderRightButtons={LangButton}
        />
        <View
          style={[
            styles.card,
            commonStyles.baseSubScreen,
            bottomOffset.current,
          ]}>
          <Avatar
            showPen
            uri="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo="
            style={styles.avatar}
          />
          <View style={styles.body}>
            <View style={styles.imageWrapper}>
              <Image
                source={Images.phone.confirmPhone}
                style={styles.image}
                resizeMode={'contain'}
              />
            </View>
            <View>
              <Text style={styles.titleText}>
                {t('settings.confirm_phone.title')}
              </Text>
              <Text style={styles.noteText}>
                {t('settings.confirm_phone.description')}
              </Text>
              <View style={styles.controlWrapper} {...stopPropagination}>
                <PhoneNumberInput
                  selectedCountry={selectedCountry}
                  showCountryCodeSearch={() => setCountrySearchVisibility(true)}
                  value={phone}
                  onValueChange={setPhone}
                  ref={phoneNumberInputRef}
                />
                {isCountrySearchVisible && (
                  <PhoneNumberSearch
                    containerStyle={styles.phoneNumberSearch}
                    selectedCountry={selectedCountry}
                    close={() => setCountrySearchVisibility(false)}
                    setCountryCode={c => {
                      phoneNumberInputRef.current?.focus();
                      setSelectedCountry(c);
                    }}
                  />
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('ConfirmPhoneCode')}>
                  <Text style={styles.buttonText}>
                    {t('settings.confirm_phone.button')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </KeyboardDismiss>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    marginTop: rem(80),
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
